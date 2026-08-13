// データ型の定義
export interface ProfileData {
    pageTitle: string;
    description: string;
    name: string;
    location: string;
    profileImage: string;
}

// プロフィールデータ
export const profileData: ProfileData = {
    pageTitle: "Profile",
    description: "Developer",
    name: "kiaamaaio",
    location: "Japan",
    profileImage: "/profile.jpg"
};
