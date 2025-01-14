import Home from "../pages/home";
import News from "../pages/news";
import Online from "@/pages/online";
import NotFound from "@/pages/notFound";

export const publicRoutes = [
    { path: '/online', Component: Online },
    { path: '/', Component: Home },
    { path: '/news-post/:id', Component: News },
    { path: '*', Component: NotFound }
];

export const authRoutes = [];