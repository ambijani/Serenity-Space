import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/SpotifyPlaylist.css";
import BackButton from "./BackButton";

export default function SpotifyPlaylist() {
  const [playlistEmbedUrl, setPlaylistEmbedUrl] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalPlaylists, setTotalPlaylists] = useState(0); // Total playlists count
  const [buttonText, setButtonText] = useState("I'm not feelin' this");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mood = queryParams.get("mood");
  const navigate = useNavigate();

  // Fetch Spotify Playlist
  const fetchSpotifyPlaylist = async () => {
    setLoading(true);
    setError(false);
    setPlaylistEmbedUrl("");

    try {
      // Fetch Spotify Access Token
      const authResponse = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(
            `${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`
          )}`,
        },
        body: "grant_type=client_credentials",
      });

      const { access_token } = await authResponse.json();

      // Fetch total playlists count if not already fetched
      if (totalPlaylists === 0) {
        const initialResponse = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(mood)}&type=playlist&limit=1`,
          { headers: { Authorization: `Bearer ${access_token}` } }
        );
        const searchData = await initialResponse.json();
        const total = searchData.playlists?.total || 0;

        if (total === 0) throw new Error("No playlists available for this mood.");
        setTotalPlaylists(total);
      }

      // Generate a valid random offset
      const validOffset = Math.floor(Math.random() * Math.min(totalPlaylists, 50)); // Limit to 50
      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          mood
        )}&type=playlist&limit=1&offset=${validOffset}`,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );

      const playlistData = await playlistResponse.json();

      if (playlistData.playlists.items.length > 0) {
        const playlistId = playlistData.playlists.items[0].id;
        setPlaylistEmbedUrl(`https://open.spotify.com/embed/playlist/${playlistId}`);
        setButtonText("I'm not feelin' this");
      } else {
        throw new Error("No playlists found.");
      }
    } catch (err) {
      console.error("Error fetching Spotify playlist:", err);
      setError(true);
      setButtonText("Try Again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpotifyPlaylist();
  }, [mood]);

  return (
    <div className="spotify-page min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white flex flex-col items-center justify-center p-6">
      {/* Back Button */}
      <BackButton />

      {/* Header */}
      <h1 className="text-4xl font-bold text-purple-400 mb-4 text-center">
        Spotify Playlist for <span className="capitalize">{mood}</span>
      </h1>
      <p className="text-gray-300 mb-8 text-center">
        Enjoy a curated playlist based on your current mood.
      </p>

      {/* Loading State */}
      {loading && <p className="text-gray-300">Loading playlist...</p>}

      {/* Spotify Playlist Embed */}
      {playlistEmbedUrl && (
        <iframe
          src={playlistEmbedUrl}
          className="spotify-iframe rounded-lg shadow-lg"
          allow="encrypted-media"
        ></iframe>
      )}

      {/* Error State */}
      {error && (
        <p className="error-message text-red-400">
          Sorry, no playlists available. Try again!
        </p>
      )}

      {/* Buttons */}
      <div className="button-container flex gap-4 mt-6">
        <button
          onClick={fetchSpotifyPlaylist}
          className="not-feeling-btn px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
        >
          {buttonText}
        </button>
        <button
          onClick={() => navigate(-1)}
          className="explore-options-btn px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105"
        >
          Explore Other Moods
        </button>
      </div>
    </div>
  );
}
