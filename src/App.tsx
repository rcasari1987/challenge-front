import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import { tvServices } from "./services";
import { Show } from "./types/tv-show";
import { MediaCard } from "./components";

function App() {
  const [tvShows, setTvShows] = useState<Show[]>();
  const [tvShow, setTvShow] = useState<Show>();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTvShow = async () => {
      setIsLoading(true);
      try {
        const { data: response } = await tvServices.getShows();

        setTvShows(response.map((item) => item.show));
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    getTvShow();
  }, []);

  const handleOpen = (id: number) => {
    const show = tvShows?.find((item) => item.id === id);
    setTvShow(show);
    setOpen(true);
  };
  const handleClose = () => {
    setTvShow(undefined);
    setOpen(false);
  };

  return (
    <Box
      sx={{ flexGrow: 1 }}
      style={{ backgroundColor: "#C3C3C3", padding: 20 }}
    >
      <Grid container spacing={2} data-testid="list">
        {tvShows &&
          tvShows.length &&
          tvShows.map((show) => (
            <Grid item xs={2} key={show?.id}>
              <MediaCard
                title={show?.name}
                src={show?.image?.medium}
                alt={`thumbnail-${show?.id}`}
                onMore={() => handleOpen(show?.id)}
              />
            </Grid>
          ))}
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <MediaCard
          title={tvShow?.name!}
          description={tvShow?.summary}
          src={tvShow?.image?.medium}
          alt={`thumbnail-${tvShow?.id}`}
          style={style}
        />
      </Modal>
    </Box>
  );
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  boxShadow: 24,
};

export default App;
