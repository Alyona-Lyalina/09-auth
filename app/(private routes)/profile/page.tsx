import css from "./ProfilePage.module.css";
import Image from "next/image";
import Link from "next/link";
import { getServerMe } from "@/lib/api/serverApi";
import { Metadata } from "next";

const SITE_NAME = "NoteHub";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();
  const title =
    SITE_NAME +
    " - " +
    (user?.username ? user.username + " profile" : "Profile page");
  const description =
    "Manage your profile and account settings on " + SITE_NAME;

  return {
    title,
    description,
  };
}

const ProfilePage = async () => {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          ) : (
            <Image
              src="/default-avatar.png"
              alt="Default Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          )}
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user?.username || "your_username"}</p>
          <p>Email: {user?.email || "your_email@example.com"}</p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
