import { useState, useRef } from 'react';
import type {FC, ChangeEvent, DragEvent, JSX } from 'react'
import JSZip from 'jszip'


// Type Definitions
interface AnalysisData {
  notFollowingBack: string[];
  mutuals: string[];
  youDontFollow: string[];
}

// interface InstagramDataItem {
//   string_list_data?: Array<{ value: string }>;
//   value?: string;
//   username?: string;
// }

interface WelcomeSlideProps {
  onNext: () => void;
}

interface UploadSlideProps {
  onBack: () => void;
  onFileSelect: (file: File) => void;
  error: string;
}

interface ResultsSlideProps {
  data: AnalysisData;
  onReset: () => void;
}

interface UserListProps {
  users: string[];
}

interface NavigationDotsProps {
  currentSlide: number;
  totalSlides: number;
  onNavigate: (index: number) => void;
}

interface TabData {
  label: string;
  data: string[];
}

// Welcome Slide Component
const WelcomeSlide: FC<WelcomeSlideProps> = ({ onNext }) => (
  <div className="p-8">
    <div className="border-8 border-black bg-primary p-6 mb-6">
      <h1 className="text-5xl font-black text-white uppercase leading-none mb-2 tracking-tight">
        INSTA<br />UNFOLLOWERS
      </h1>
      <p className="text-white font-bold text-sm uppercase tracking-wider">
        PRIVACY → SECURITY → INSTANT
      </p>
    </div>

    <div className="border-4 border-black bg-white mb-6">
      <div className="bg-black text-white px-4 py-2">
        <h3 className="text-sm font-black uppercase tracking-wider">🔒 PRIVACY LOCK</h3>
      </div>
      <ul className="p-4 space-y-2">
        {['NO LOGIN', 'LOCAL ONLY', 'NO SERVERS', '100% OFFLINE'].map((item, index) => (
          <li key={index} className="flex items-start gap-2 font-bold text-xs uppercase">
            <span className="text-gold text-lg">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="border-4 border-black bg-lightgold mb-6">
      <div className="bg-gold text-black px-4 py-2 border-b-4 border-black">
        <h3 className="text-sm font-black uppercase tracking-wider">📥 GET DATA</h3>
      </div>
      <ol className="p-4 space-y-2 list-decimal list-inside text-xs font-bold">
        <li>INSTAGRAM → SETTINGS</li>
        <li>PRIVACY & SECURITY</li>
        <li>DATA DOWNLOAD</li>
        <li>FORMAT: <span className="bg-black text-lightgold px-2 py-1 font-mono">JSON</span></li>
        <li>WAIT 5-10 MIN</li>
        <li>UPLOAD HERE ↓</li>
      </ol>
    </div>

    <button
      onClick={onNext}
      className="w-full bg-black text-white border-4 border-black hover:bg-white hover:text-black transition-all font-black text-lg uppercase py-4 tracking-wider shadow-[4px_4px_0px_0px_rgba(47,56,159,1)]"
    >
      START NOW →
    </button>

    <p className="text-center text-xs font-bold uppercase mt-4 opacity-50">
      FREE • NO ADS • OPEN SOURCE
    </p>
  </div>
);

// Upload Slide Component
const UploadSlide: FC<UploadSlideProps> = ({ onBack, onFileSelect, error }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="p-8">
      <button
        onClick={onBack}
        className="mb-4 text-sm font-black uppercase flex items-center gap-2 hover:gap-3 transition-all"
      >
        <span>←</span> BACK
      </button>

      <div className="border-8 border-black bg-dark p-4 mb-6">
        <h2 className="text-3xl font-black text-white uppercase leading-tight">
          UPLOAD<br />DATA.ZIP
        </h2>
      </div>

      {error && (
        <div className="border-4 border-red-600 bg-red-50 p-4 mb-4">
          <p className="text-red-900 font-bold text-sm">{error}</p>
        </div>
      )}

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => fileInputRef.current?.click()}
        className={`border-8 border-dashed border-black p-8 text-center cursor-pointer transition-all mb-4 ${
          isDragging ? 'bg-gray-100' : 'hover:bg-gray-50'
        }`}
      >
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-2xl font-black uppercase mb-2">DROP HERE</h3>
        <p className="text-sm font-bold uppercase mb-4 opacity-60">OR CLICK TO BROWSE</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="bg-primary text-white border-4 border-black font-black text-sm uppercase py-3 px-6 hover:bg-dark transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          CHOOSE FILE
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".zip"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="border-l-4 border-gold bg-yellow-50 p-4">
        <p className="text-xs font-bold uppercase">
          🔐 ALL PROCESSING IS LOCAL<br />
          NOTHING LEAVES YOUR BROWSER
        </p>
      </div>
    </div>
  );
};

// Loading Slide Component
const LoadingSlide: FC = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <div className="w-20 h-20 border-8 border-gray-200 border-t-primary rounded-full spinner mx-auto mb-6"></div>
      <h2 className="text-3xl font-black uppercase mb-2">ANALYZING...</h2>
      <p className="text-sm font-bold uppercase opacity-60">PROCESSING DATA</p>
    </div>
  </div>
);

// User List Component
const UserList: FC<UserListProps> = ({ users }) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4 opacity-30">✨</div>
        <p className="text-sm font-bold uppercase opacity-50">EMPTY</p>
      </div>
    );
  }

  return (
    <div className="max-h-64 overflow-y-auto mb-4">
      {users.map((username: string, index: number) => {
        const initial = username.charAt(0).toUpperCase();
        return (
          <div
            key={index}
            className="flex items-center gap-3 p-3 mb-2 border-4 border-black bg-white hover:bg-gray-50 transition-all cursor-pointer"
          >
            <div className="w-10 h-10 bg-linear-to-br from-primary to-dark flex items-center justify-center text-white font-black text-lg flex-shrink-0">
              {initial}
            </div>
            <div className="font-black text-sm uppercase">@{username}</div>
          </div>
        );
      })}
    </div>
  );
};

// Results Slide Component
const ResultsSlide: FC<ResultsSlideProps> = ({ data, onReset }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const tabs: TabData[] = [
    { label: 'NOT BACK', data: data.notFollowingBack },
    { label: 'MUTUAL', data: data.mutuals },
    { label: 'YOU DON\'T', data: data.youDontFollow }
  ];

  const handleCopy = (): void => {
    const currentData = tabs[activeTab].data;
    if (currentData.length === 0) {
      alert('NO USERNAMES TO COPY');
      return;
    }

    const text = currentData.map(u => `@${u}`).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }).catch(() => {
      alert('COPY FAILED');
    });
  };

  const handleExportCSV = (): void => {
    const csvContent = [
      ['Category', 'Username'],
      ...data.notFollowingBack.map(u => ['Not Following Back', u]),
      ...data.mutuals.map(u => ['Mutual', u]),
      ...data.youDontFollow.map(u => ['You Don\'t Follow', u])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'instagram_analysis.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8">
      <button
        onClick={onReset}
        className="mb-4 text-sm font-black uppercase flex items-center gap-2 hover:gap-3 transition-all"
      >
        <span>←</span> RESET
      </button>

      <div className="border-8 border-black bg-dark p-4 mb-6">
        <h2 className="text-3xl font-black text-white uppercase leading-tight">RESULTS</h2>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { count: data.notFollowingBack.length, label: 'NOT BACK' },
          { count: data.mutuals.length, label: 'MUTUAL' },
          { count: data.youDontFollow.length, label: 'YOU DON\'T' }
        ].map((stat, index) => (
          <div key={index} className="border-4 border-black bg-white p-4 text-center hover:bg-gray-50 transition-all">
            <div className="text-4xl font-black text-primary mb-1">{stat.count}</div>
            <div className="text-[9px] font-black uppercase tracking-wide opacity-60">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-4 border-b-4 border-black">
        {tabs.map((tab: TabData, index: number) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 font-black text-xs uppercase border-b-4 transition-all ${
              activeTab === index
                ? 'border-black opacity-100'
                : 'border-transparent opacity-50 hover:opacity-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <UserList users={tabs[activeTab].data} />

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleCopy}
          className={`border-4 border-black font-black text-sm uppercase py-3 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
            copySuccess ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-100'
          }`}
        >
          {copySuccess ? '✓ COPIED!' : '📋 COPY'}
        </button>
        <button
          onClick={handleExportCSV}
          className="bg-white border-4 border-black font-black text-sm uppercase py-3 hover:bg-gray-100 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        >
          💾 CSV
        </button>
      </div>
    </div>
  );
};

// Navigation Dots Component
const NavigationDots: FC<NavigationDotsProps> = ({ currentSlide, totalSlides, onNavigate }) => (
  <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
    {Array.from({ length: totalSlides }).map((_, index: number) => (
      <div
        key={index}
        onClick={() => onNavigate(index)}
        className={`h-3 bg-black cursor-pointer transition-all ${
          index === currentSlide ? 'w-8 opacity-100' : 'w-3 opacity-20'
        }`}
      />
    ))}
  </div>
);

// Main App Component
const App: FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    notFollowingBack: [],
    mutuals: [],
    youDontFollow: []
  });

  const normalize = (u: string) =>
  u.toLowerCase().trim().replace(/^@/, '');


// const extractUsername = (item: InstagramDataItem | string): string | null => {
//   if (typeof item === 'string') {
//     return item.toLowerCase().trim().replace(/^@/, '');
//   }

//   if (item?.string_list_data?.length) {
//     const value = item.string_list_data[0]?.value;
//     if (typeof value === 'string') {
//       return value.toLowerCase().trim().replace(/^@/, '');
//     }
//   }

//   if (typeof item?.value === 'string') {
//     return item.value.toLowerCase().trim().replace(/^@/, '');
//   }

//   if (typeof item?.username === 'string') {
//     return item.username.toLowerCase().trim().replace(/^@/, '');
//   }

//   return null;
// };


  const extractFollowers = async (zip: any): Promise<string[] | null> => {
    const followers: string[] = [];
    const followerFiles: any[] = [];

    zip.forEach((relativePath: string, file: any) => {
      if (relativePath.includes('followers_') && relativePath.endsWith('.json')) {
        followerFiles.push(file);
      }
    });

    if (followerFiles.length === 0) {
      const altFile = zip.file('connections/followers_and_following/followers_1.json') ||
                      zip.file('followers_and_following/followers_1.json') ||
                      zip.file('followers_1.json');
      if (altFile) followerFiles.push(altFile);
    }

    if (followerFiles.length === 0) return null;

    for (const file of followerFiles) {
      try {
        const content: string = await file.async('text');
        const data = JSON.parse(content);
        const items = Array.isArray(data) ? data : data.relationships_followers || [];

        items.forEach((item: any) => {
  if (Array.isArray(item?.string_list_data)) {
    item.string_list_data.forEach((entry: any) => {
      if (typeof entry?.value === 'string') {
        followers.push(normalize(entry.value));
      }
    });
  }
});
      } catch (error) {
        console.error('Error parsing follower file:', error);
      }
    }

    return followers.length > 0 ? followers : null;
  };

  const extractFollowing = async (zip: any): Promise<string[] | null> => {
    const following: string[] = [];
    const possiblePaths: string[] = [
      'connections/followers_and_following/following.json',
      'followers_and_following/following.json',
      'following.json'
    ];

    let followingFile: any = null;
    for (const path of possiblePaths) {
      followingFile = zip.file(path);
      if (followingFile) break;
    }

    if (!followingFile) {
      zip.forEach((relativePath: string, file: any) => {
        const path = relativePath.toLowerCase();
          if (path.includes('following') && path.endsWith('.json') && !followingFile) {
          followingFile = file;
        }
      });
    }

    if (!followingFile) return null;

    try {
      const content: string = await followingFile.async('text');
      const data = JSON.parse(content);
      const items = Array.isArray(data)
  ? data
  : Array.isArray(data?.relationships_following)
    ? data.relationships_following
    : [];

      
   items.forEach((item: any) => {
  if (typeof item?.title === 'string') {
    following.push(normalize(item.title));
  }
});

    } catch (error) {
      console.error('Error parsing following file:', error);
      return null;
    }

    return following.length > 0 ? following : null;
  };

  const handleFileSelect = async (file: File): Promise<void> => {
    if (!file.name.endsWith('.zip')) {
      setError('ERROR: MUST BE .ZIP FILE FROM INSTAGRAM');
      return;
    }

    setError('');
    setCurrentSlide(2);

    try {
      const zip = await JSZip.loadAsync(file);
      const followers = await extractFollowers(zip);
      const following = await extractFollowing(zip);

      if (!followers || !following) {
        throw new Error('FOLLOWERS/FOLLOWING DATA NOT FOUND. USE JSON FORMAT.');
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
        youDontFollow: youDontFollow.sort()
      });

      setCurrentSlide(3);
    } catch (error) {
      console.error('Error processing file:', error);
      setCurrentSlide(1);
      setError((error as Error).message || 'FAILED TO PROCESS ZIP. CHECK FILE FORMAT.');
    }
  };

  const handleReset = (): void => {
    setCurrentSlide(0);
    setError('');
    setAnalysisData({
      notFollowingBack: [],
      mutuals: [],
      youDontFollow: []
    });
  };

  const slides: JSX.Element[] = [
    <WelcomeSlide onNext={() => setCurrentSlide(1)} />,
    <UploadSlide onBack={() => setCurrentSlide(0)} onFileSelect={handleFileSelect} error={error} />,
    <LoadingSlide />,
    <ResultsSlide data={analysisData} onReset={handleReset} />
  ];

  return (
  <div className="w-[380px] h-[600px] overflow-hidden">
    <div
      className="flex transition-transform duration-500 ease-out"
      style={{
        transform: `translateX(-${currentSlide * 380}px)`,
        width: '1520px',
        height: '600px'
      }}
    >
      {slides.map((slide, index) => (
        <div key={index} className="w-[380px] h-[600px] flex-shrink-0 overflow-y-auto">
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

export default App
