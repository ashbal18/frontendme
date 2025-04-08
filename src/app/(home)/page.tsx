import PostList from "@/components/post";
import { auth } from "@/lib/auth";
import Image from "next/image";

export default async function Home() {
  const data = await auth();
  const user = data?.user;

  return (
    <div className="flex w-full px-4 py-6 gap-6">
      {/* Feed utama */}
      <div className="flex flex-col w-full lg:w-2/3 items-center">
        <PostList />
      </div>

      {/* Sidebar kanan */}
      <div className="hidden lg:flex flex-col w-1/3 space-y-4">
        {/* Profil singkat */}
        {user && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Gambar profil */}
              {user.image ? (
                <Image
                  src={user.image}
                  alt="Profile Picture"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300" />
              )}

              {/* Nama dan teks switch */}
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-blue-500 cursor-pointer">Switch</p>
              </div>
            </div>
          </div>
        )}

        {/* Suggested for you */}
        <div className="bg-white rounded-2xl shadow p-4">
          <p className="font-semibold text-sm text-gray-500 mb-2">Suggested for you</p>
          {["vvv_gtg", "llaurgxvz", "haihilmy_", "prediapriliandi_", "an.ggasaputra94"].map((username) => (
            <div key={username} className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-gray-200" />
                <div>
                  <p className="text-sm font-medium">{username}</p>
                  <p className="text-xs text-gray-400">Followed by ...</p>
                </div>
              </div>
              <button className="text-blue-500 text-sm font-semibold">Follow</button>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-6">
          © 2025 INSTAGRAM FROM META
        </p>
      </div>
    </div>
  );
}
