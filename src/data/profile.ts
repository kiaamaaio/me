// データ型の定義
export interface ProfileData {
    title: string;
    description: string;
    name: string;
    location: string;
    profileImage: string;
}

// プロフィールデータ
export const profileData: ProfileData = {
    title: "Profile",
    description: "Developer",
    name: "kiaamaaio",
    location: "Japan",
    profileImage: "/profile.jpg"
};
