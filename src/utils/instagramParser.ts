import { normalize } from "./normalize";
import { detectInstagramFormat } from "./instagramFormat";

function extractAccountsFollowing(data: any): string[] {
  const result: string[] = [];

  const items = data.relationships_following || [];

  items.forEach((item: any) => {
    if (typeof item?.title === "string") {
      result.push(normalize(item.title));
    }
  });

  return result;
}

function extractLegacyFollowing(data: any): string[] {
  const result: string[] = [];

  data.forEach((item: any) => {
    if (Array.isArray(item?.string_list_data)) {
      item.string_list_data.forEach((entry: any) => {
        if (typeof entry?.value === "string") {
         result.push(normalize(entry.value));
        }
      });
    }
  });

  return result;
}


export const extractFollowers = async (zip: any): Promise<string[] | null> => {
  const followers: string[] = [];
  const followerFiles: any[] = [];

  zip.forEach((relativePath: string, file: any) => {
    if (relativePath.includes("followers_") && relativePath.endsWith(".json")) {
      followerFiles.push(file);
    }
  });

  if (followerFiles.length === 0) {
    const altFile =
      zip.file("connections/followers_and_following/followers_1.json") ||
      zip.file("followers_and_following/followers_1.json") ||
      zip.file("followers_1.json");
    if (altFile) followerFiles.push(altFile);
  }

  if (followerFiles.length === 0) return null;

  for (const file of followerFiles) {
    try {
      const content: string = await file.async("text");
      const data = JSON.parse(content);
      const items = Array.isArray(data)
        ? data
        : data.relationships_followers || [];

      items.forEach((item: any) => {
        if (Array.isArray(item?.string_list_data)) {
          item.string_list_data.forEach((entry: any) => {
            if (typeof entry?.value === "string") {
              followers.push(normalize(entry.value));
            }
          });
        }
      });
    } catch (error) {
      console.error("Error parsing follower file:", error);
    }
  }

  return followers.length > 0 ? followers : null;
};

export const extractFollowing = async (zip: any): Promise<string[] | null> => {
  const following: string[] = [];
  const possiblePaths: string[] = [
    "connections/followers_and_following/following.json",
    "followers_and_following/following.json",
    "following.json",
  ];

  let followingFile: any = null;
  for (const path of possiblePaths) {
    followingFile = zip.file(path);
    if (followingFile) break;
  }

  if (!followingFile) {
    zip.forEach((relativePath: string, file: any) => {
      const path = relativePath.toLowerCase();
      if (
        path.includes("following") &&
        path.endsWith(".json") &&
        !followingFile
      ) {
        followingFile = file;
      }
    });
  }

  if (!followingFile) return null;

  try {
    const content: string = await followingFile.async("text");
    const data = JSON.parse(content);
    const format = detectInstagramFormat(null, data);

    console.log("Detected Instagram format:", format);

    if (format === "unknown") {
      throw new Error(
        "Unsupported Instagram export format. Please export using JSON format.",
      );
    }

    if (format === "accounts-center") {
      return extractAccountsFollowing(data);
    }

    if (format === "legacy-json") {
      return extractLegacyFollowing(data);
    }
  } catch (error) {
    console.error("Error parsing following file:", error);
    return null;
  }

  return following.length > 0 ? following : null;
};
