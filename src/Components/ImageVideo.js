import { Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router";

function ImageVideo(props) {
  const location = useLocation();
  const search = useLocation().search;
  const page = new URLSearchParams(search).get("page");

  const objFromPage = JSON.parse(page);

  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const [imgUrlFromDb, setImgUrlFromDb] = useState();
  const postCall = (formData) => {
    fetch("http://localhost:8082/image/", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div style={{ marginLeft: 10 }}>
      <Typography>{objFromPage.info}</Typography>

      <input
        accept="image/*"
        type="file"
        id="contained-button-file"
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            console.log(img);
            let iu = URL.createObjectURL(img);
            setImageUrl(iu);

            const formData = new FormData();
            formData.append("file", e.target.files[0]);
            formData.append("imageDetail", "Savan's image");

            postCall(formData);
          }
        }}
      />

      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload Image
        </Button>
      </label>

      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: 10 }}
        onClick={() => {
          fetch("http://localhost:8082/image/getImage/119", {
            method: "GET",
            credentials: "include",
          })
            .then((res) => res.blob())
            .then((imageBlob) => {
              const imageObjectURL = URL.createObjectURL(imageBlob);
              console.log(imageObjectURL);
              setImgUrlFromDb(imageObjectURL);
            })
            .catch((err) => console.log(err));
        }}
      >
        Get Image From DB
      </Button>

      <div style={{ marginTop: 10 }}>
        {imgUrlFromDb && imgUrlFromDb.length > 0 ? (
          <img src={imgUrlFromDb} alt="oops" width="500" height="500" />
        ) : null}
      </div>

      <div style={{ marginTop: 10 }}>
        {imageUrl !== null ? (
          <img src={imageUrl} alt="oops" width="500" height="500" />
        ) : null}
      </div>

      <input
        accept="video/*"
        type="file"
        id="contained-button-file-video"
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            let vid = e.target.files[0];
            console.log(vid);
            let iu = URL.createObjectURL(vid);
            setVideoUrl(iu);
          }
        }}
      />

      <label htmlFor="contained-button-file-video">
        <Button variant="contained" color="primary" component="span">
          Upload Video
        </Button>
      </label>

      <div>
        {videoUrl !== null ? (
          <video width="750" height="500" controls>
            <source
              src={videoUrl !== null ? videoUrl : null}
              type="video/mp4"
            />
          </video>
        ) : null}
      </div>
    </div>
  );
}

export default ImageVideo;
