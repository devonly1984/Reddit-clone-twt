import { HomePage, PostPage, ProfilePage, SubmitPage, SubredditPage } from "./";
import {Routes,Route,Navigate} from 'react-router-dom'
import Layout from "../components/layout/Layout";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="r/:subredditName" element={<SubredditPage />} />
        <Route path="r/:subredditName/submit" element={<SubmitPage />} />
        <Route path="u/:username" element={<ProfilePage />} />
        <Route path="post/:postId" element={<PostPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
export default Router;
