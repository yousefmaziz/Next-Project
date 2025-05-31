'use client';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import { red } from '@mui/material/colors';

import { Post } from '@/types/posts.types';
import Comments from '../Comments/Comments';
import { Box, Button, Divider, TextField } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';


import { addComments, setCommentContent } from '@/store/feature/comment.slice';
import { useAPPDispatch, useAPPSelector } from '@/hooks/store.hook';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard({ postInfo, showComment = false }: { postInfo: Post, showComment: boolean }) {
  const dispatch = useAPPDispatch();
  const commentContent = useAPPSelector((store) => store.commentReducer.commentContent);

  const handleAddComment = async () => {
    if (!commentContent.trim()) return;

    const commentData = {
      content: commentContent,
      postId: postInfo._id,
    };

    try {
      await dispatch(addComments(commentData));
      dispatch(setCommentContent(""));
    } catch (error) {
      console.log("Error adding comment:", error);
    }
  };

  return (
    <Card sx={{ Width: "75%", mx: "auto", mt: 5 }}>
      <CardHeader
        avatar={
          <Image src={postInfo.user?.photo} width={50} height={50} alt="avatar" />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={postInfo.user.name}
        subheader={postInfo.createdAt}
      />

      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {postInfo.body}
        </Typography>
      </CardContent>

      {postInfo.image && (
        <CardMedia
          component="img"
          height="194"
          image={postInfo.image}
          alt="Post image"
        />
      )}

      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton aria-label="like">
          <ThumbUpIcon />
        </IconButton>

        <IconButton aria-label="comment">
          <CommentIcon />
        </IconButton>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>

      <Divider>Comments</Divider>

      <Box sx={{ p: 2 }}>
        {postInfo.comments.length > 0 && (
          <Comments commentInfo={postInfo.comments[postInfo.comments.length - 1]} />
        )}

        {postInfo.comments.length > 1 && showComment &&
          postInfo.comments.map((comment) => (
            <Comments key={comment.__id} commentInfo={comment} />
          ))}

        {!showComment && postInfo.comments.length > 1 && (
          <Button variant="contained" fullWidth sx={{ my: 2 }}>
            <Link href={`/post/${postInfo._id}`}>
              Show more comments
            </Link>
          </Button>
        )}

        <Box sx={{ display: "flex" }}>
          <TextField
            sx={{ m: 1, width: "100%" }}
            placeholder="Add your Comment"
            value={commentContent}
            onChange={(e) => dispatch(setCommentContent(e.target.value))}
          />
          <Button
            sx={{ width: "5%", height: "3", p: 0 }}
            variant="text"
            endIcon={<SendIcon />}
            onClick={handleAddComment}
          />
        </Box>
      </Box>
    </Card>
  );
}
