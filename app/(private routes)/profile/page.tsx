import Image from "next/image";
import Link from "next/link";
import css from "./ProfilePage.module.css";
import { getServerMe } from "@/lib/api/serverApi";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();
  const title = user?.username
    ? `NoteHub - ${user.username} profile`
    : `NoteHub - Profile Page`;
  const description = `Manage your profile and account settings on NoteHub`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://09-auth-gray-iota.vercel.app/profile",
      images: [
        {
          url:
            user?.avatar ||
            "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: user?.username || "Profile Page",
        },
      ],
    },
  };
}

const ProfilePage = async () => {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          {user?.avatar && (
            <Image
              src={user.avatar}
              alt={user.username || "User Avatar"}
              width={120}
              height={120}
              className={css.avatar}
            />
          )}
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username || "Unknown"}</p>
          <p>Email: {user?.email || "Not provided"}</p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
