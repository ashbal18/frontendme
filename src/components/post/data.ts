interface IUser {
  username: string;
  profile_pic: string;
}

export interface IPost {
  id: number;
  image_url: string;
  content?: string;
  user: IUser;
}

const post: IPost = {
  id: 1,
  image_url:
    "https://res.cloudinary.com/dkppu1rgv/image/upload/v1742455181/samples/smile.jpg",
  content: "Pagi Hari Yang Cerah Semua",
  user: {
    username: "andi123",
    profile_pic:
      "https://res.cloudinary.com/dkppu1rgv/image/upload/v1742455181/samples/smile.jpg",
  },
};

export const posts: IPost[] = [post, post, post, post, post];
