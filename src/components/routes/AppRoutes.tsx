import React, { FC, useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../../pages/home/Home";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import NotFound from "../../pages/404/NotFound";
import RequireAuth from "./RequireAuth";
import CreatePost from "../../pages/createPost/CreatePost";
import UpdatePost from "../../pages/updatePost/UpdatePost";
import UpdateDraft from "../../pages/updateDraft/UpdateDraft";
import Profile from "../../pages/profile/Profile";
import Post from "../../pages/post/Post";
import { motion } from "framer-motion";
import Search from '../../pages/search/Search';
import Fork from '../../pages/fork/Fork';
import Draft from '../../pages/draft/Draft';
import ProfileEdit from "../../pages/profileEdit/ProfileEdit";
import TopPage from '../../pages/top/Top';

const AppRoutes: FC = () => {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return (
        <Routes>
            <Route path={'/'}>
                <Route index element={<TopPage />} />
                <Route path={'home'} element={<Home />} />
                <Route path={'login'} element={<Login />} />
                <Route path={'register'} element={<Register />} />
                <Route path={'search'} element={<Search />} />
                <Route path={'posts/:post_id'} element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Post /></motion.div>} />
                <Route path={'profiles/:user_id'} element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Profile /></motion.div>} />
                <Route element={<RequireAuth />}>
                    <Route path={'create'} element={<CreatePost />} />
                    <Route path={'profile'} element={<Profile />} />
                    <Route path={'profile/edit'} element={<ProfileEdit/>} />
                    <Route path={'drafts'} element={<Draft />} />
                    <Route path={'posts/:post_id/fork'} element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Fork /></motion.div>} />
                    <Route path={'posts/:post_id/edit'} element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><UpdatePost /></motion.div>} />
                    <Route path={'drafts/:draft_id/edit'} element={<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><UpdateDraft/></motion.div>} />
                </Route>
                <Route path={'*'} element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;