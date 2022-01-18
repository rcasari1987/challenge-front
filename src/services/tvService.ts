import axios, { AxiosResponse } from "axios";
import { TvShowResponse } from "../types/tv-show";

const tvServices = {
  getShows: function (): Promise<AxiosResponse<TvShowResponse[]>> {
    return axios.get(`http://api.tvmaze.com/search/shows?q=girls`);
  },
};

export default tvServices;
