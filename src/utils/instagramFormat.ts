export type InstagramFormat =
  | 'legacy-json'
  | 'accounts-center'
  | 'unknown';

export function detectInstagramFormat(
  followersData: any,
  followingData: any
): InstagramFormat {
  if (Array.isArray(followersData)) {
    const sample = followersData[0];

    if (sample?.string_list_data) {
      return 'legacy-json';
    }
  }

  if (
    followingData &&
    typeof followingData === 'object' &&
    'relationships_following' in followingData
  ) {
    return 'accounts-center';
  }

  return 'unknown';
}
