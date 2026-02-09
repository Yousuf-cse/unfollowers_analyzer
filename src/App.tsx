import { useState, useEffect } from "react";
import type { FC, JSX } from "react";
import JSZip from "jszip";
import type { AnalysisData } from "./types/instagram";
import { extractFollowers } from "./utils/instagramParser";
import { extractFollowing } from "./utils/instagramParser";
import { WelcomeSlide } from "./slides/WelcomeSlide";
import { UploadSlide } from "./slides/UploadSlide";
import { LoadingSlide } from "./slides/LoadingSlide";
import { ResultsSlide } from "./slides/ResultsSlide";
import { NavigationDots } from "./components/NavigationDots";

const App: FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    notFollowingBack: [],
    mutuals: [],
    youDontFollow: [],
  });
  const [guidedUsers, setGuidedUsers] = useState<string[]>([]);
  const [guidedIndex, setGuidedIndex] = useState(0);
  const [guidedActive, setGuidedActive] = useState(false);
  const [visited, setVisited] = useState<Set<string>>(new Set());

  const handleFileSelect = async (file: File): Promise<void> => {
    if (!file.name.endsWith(".zip")) {
      setError("ERROR: MUST BE .ZIP FILE FROM INSTAGRAM");
      return;
    }

    setError("");
    setCurrentSlide(2);

    try {
      const zip = await JSZip.loadAsync(file);
      const followers = await extractFollowers(zip);
      const following = await extractFollowing(zip);

      if (!followers || !following) {
        throw new Error("FOLLOWERS/FOLLOWING DATA NOT FOUND. USE JSON FORMAT.");
      }

      const followersSet = new Set<string>(followers);
      const followingSet = new Set<string>(following);

      const notFollowingBack: string[] = [];
      const mutuals: string[] = [];
      const youDontFollow: string[] = [];

      followingSet.forEach((username: string) => {
        if (!followersSet.has(username)) {
          notFollowingBack.push(username);
        } else {
          mutuals.push(username);
        }
      });

      followersSet.forEach((username: string) => {
        if (!followingSet.has(username)) {
          youDontFollow.push(username);
        }
      });

      setAnalysisData({
        notFollowingBack: notFollowingBack.sort(),
        mutuals: mutuals.sort(),
        youDontFollow: youDontFollow.sort(),
      });

      setCurrentSlide(3);
    } catch (error) {
      console.error("Error processing file:", error);
      setCurrentSlide(1);
      setError(
        (error as Error).message || "FAILED TO PROCESS ZIP. CHECK FILE FORMAT.",
      );
    }
  };

  const handleReset = (): void => {
    setCurrentSlide(0);
    setError("");
    setAnalysisData({
      notFollowingBack: [],
      mutuals: [],
      youDontFollow: [],
    });
  };

  const openProfile = (username: string) => {
    const url = `https://www.instagram.com/${username}/`;
    chrome.tabs.update({ url });
  };

  const startGuidedMode = (users: string[]) => {
    if (!users.length) return;

    setGuidedUsers(users);
    setGuidedIndex(0);
    setGuidedActive(true);

    openProfile(users[0]);
  };

  const nextGuidedProfile = () => {
    if (!guidedActive) return;

    const user = guidedUsers[guidedIndex];

    setVisited((prev) => new Set(prev).add(user));

    const next = guidedIndex + 1;

    if (next >= guidedUsers.length) {
      stopGuidedMode();
      return;
    }

    setGuidedIndex(next);

    openProfile(guidedUsers[next]);
  };

  const stopGuidedMode = () => {
    setGuidedActive(false);
  };

  useEffect(() => {
    const handler = (msg: any) => {
      if (
        msg.type === "GUIDED_NEXT" ||
        msg.type === "GUIDED_UNFOLLOW_DETECTED"
      ) {
        nextGuidedProfile();
      }
    };

    chrome.runtime.onMessage.addListener(handler);

    return () => {
      chrome.runtime.onMessage.removeListener(handler);
    };
  }, [nextGuidedProfile]);

  const slides: JSX.Element[] = [
    <WelcomeSlide onNext={() => setCurrentSlide(1)} />,
    <UploadSlide
      onBack={() => setCurrentSlide(0)}
      onFileSelect={handleFileSelect}
      error={error}
    />,
    <LoadingSlide />,
    <ResultsSlide
      data={analysisData}
      onReset={handleReset}
      startGuidedMode={startGuidedMode}
      nextGuidedProfile={nextGuidedProfile}
      stopGuidedMode={stopGuidedMode}
      guidedActive={guidedActive}
      guidedIndex={guidedIndex}
      guidedTotal={guidedUsers.length}
      visited={visited}
    />,
  ];

  return (
    <div className="w-[380px] h-[600px] overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(-${currentSlide * 380}px)`,
          width: "1520px",
          height: "600px",
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-[380px] h-[600px] flex-shrink-0 overflow-y-auto"
          >
            {slide}
          </div>
        ))}
      </div>

      <NavigationDots
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onNavigate={setCurrentSlide}
      />
    </div>
  );
};

export default App;
