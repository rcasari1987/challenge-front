import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type MediaCardProps = {
  src?: string;
  alt?: string;
  title: string;
  description?: string;
  onMore?: () => void;
  style?: any;
};

const MediaCard = React.forwardRef(
  (props: MediaCardProps, Ref: React.Ref<any>) => {
    const { src, alt, title, description, onMore, style } = props;
    return (
      <Card sx={style}>
        <CardMedia
          component="img"
          image={
            src
              ? src
              : "https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg"
          }
          alt={alt}
          height={300}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ wordWrap: "break-word" }}
          >
            {description ? description : "without summary"}
          </Typography>
        </CardContent>
        {onMore && (
          <CardActions>
            <Button size="small" onClick={() => onMore()}>
              More
            </Button>
          </CardActions>
        )}
      </Card>
    );
  }
);

export default MediaCard;
