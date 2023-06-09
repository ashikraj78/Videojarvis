import Head from "next/head";
import { useState } from "react";
import { toast } from "react-hot-toast";
import clsx from "clsx";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";
import { supabaseClient } from "~/lib/supabase";
import Link from "next/link";

type Video = {
  video_id: string;
  url: string;
  title: string;
  thumbnail: string;
  summary: string;
};

export default function Home({ video }: { video: Video }) {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [plusClicked, setPlusClicked] = useState(false)
  function handlePlusClick(){
    setPlusClicked(true)
  }
  // console.log(video.url, "video")

  let videoUrl = video.url.replace("watch?v=", "embed/")
  
  const fetchAnswer = async (query: string) => {
    setIsLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          videoId: video.video_id,
        }),
      });

      if (!response.ok) {
        toast.error(response.statusText);
        throw new Error(response.statusText);
      }

      const data = await response.json();

      if (!data || !data.answer) {
        toast.error("No answer in response!");
        throw new Error("No answer in response!");
      }

      setAnswer(data.answer);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main >
       <Head>
        <title>{video.title} | YT-GPT</title>
      </Head>

      
      <section className="flex h-screen overflow-hidden">
        <div className="w-3/5 p-6"> 
          <Link href="/">
          {/* <Image src="/logo.png" alt="YT-GPT" height={80} width={80} /> */}
          <svg width="183" height="29" viewBox="0 0 183 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.6232 27.2785L33.2754 27.85L28.4058 19.3583L40 20.1748L37.6232 16.0106C36 13.1528 33.5652 11.4381 31.0145 11.2748L23.3623 10.7032L28.2319 19.195L16.6377 18.3785L19.0145 22.5427C20.6377 25.3188 23.0145 27.0335 25.6232 27.2785Z" fill="#464646"/>
<path d="M8.98551 17.7253L16.6377 18.2968L11.7681 9.80506L23.3623 10.6216L20.9855 6.45736C19.3623 3.59957 16.9275 1.88488 14.3768 1.72158L6.72464 1.15002L11.5942 9.64176L0 8.82525L2.37681 12.9895C4 15.8473 6.43478 17.562 8.98551 17.7253Z" fill="#464646"/>
<path d="M49.6705 5.54545L53.8892 18.8068H54.0511L58.2784 5.54545H62.3693L56.3523 23H51.5966L45.571 5.54545H49.6705ZM62.602 23V9.90909H66.2327V23H62.602ZM64.4259 8.22159C63.8861 8.22159 63.423 8.04261 63.0366 7.68466C62.656 7.32102 62.4656 6.88636 62.4656 6.38068C62.4656 5.88068 62.656 5.4517 63.0366 5.09375C63.423 4.73011 63.8861 4.54829 64.4259 4.54829C64.9656 4.54829 65.4259 4.73011 65.8065 5.09375C66.1929 5.4517 66.3861 5.88068 66.3861 6.38068C66.3861 6.88636 66.1929 7.32102 65.8065 7.68466C65.4259 8.04261 64.9656 8.22159 64.4259 8.22159ZM72.1649 23.2131C71.1706 23.2131 70.27 22.9574 69.4632 22.446C68.6621 21.929 68.0257 21.1705 67.5541 20.1705C67.0882 19.1648 66.8553 17.9318 66.8553 16.4716C66.8553 14.9716 67.0967 13.7244 67.5797 12.7301C68.0626 11.7301 68.7047 10.983 69.5058 10.4886C70.3126 9.98864 71.1962 9.73864 72.1564 9.73864C72.8893 9.73864 73.5001 9.86364 73.9888 10.1136C74.4831 10.358 74.8808 10.6648 75.182 11.0341C75.4888 11.3977 75.7217 11.7557 75.8808 12.108H75.9916V5.54545H79.6138V23H76.0342V20.9034H75.8808C75.7104 21.267 75.4689 21.6278 75.1564 21.9858C74.8496 22.3381 74.449 22.6307 73.9547 22.8636C73.4661 23.0966 72.8695 23.2131 72.1649 23.2131ZM73.3155 20.3239C73.9007 20.3239 74.395 20.1648 74.7984 19.8466C75.2075 19.5227 75.52 19.071 75.7359 18.4915C75.9575 17.9119 76.0683 17.233 76.0683 16.4545C76.0683 15.6761 75.9604 15 75.7445 14.4261C75.5286 13.8523 75.2161 13.4091 74.807 13.0966C74.3979 12.7841 73.9007 12.6278 73.3155 12.6278C72.7189 12.6278 72.2161 12.7898 71.807 13.1136C71.3979 13.4375 71.0882 13.8864 70.878 14.4602C70.6678 15.0341 70.5626 15.6989 70.5626 16.4545C70.5626 17.2159 70.6678 17.8892 70.878 18.4744C71.0939 19.054 71.4036 19.5085 71.807 19.8381C72.2161 20.1619 72.7189 20.3239 73.3155 20.3239ZM86.7648 23.2557C85.4182 23.2557 84.2591 22.983 83.2875 22.4375C82.3216 21.8864 81.5773 21.108 81.0545 20.1023C80.5318 19.0909 80.2705 17.8949 80.2705 16.5142C80.2705 15.1676 80.5318 13.9858 81.0545 12.9688C81.5773 11.9517 82.3131 11.1591 83.2619 10.5909C84.2165 10.0227 85.3358 9.73864 86.6199 9.73864C87.4835 9.73864 88.2875 9.87784 89.0318 10.1562C89.7818 10.429 90.4352 10.8409 90.992 11.392C91.5545 11.9432 91.992 12.6364 92.3045 13.4716C92.617 14.3011 92.7733 15.2727 92.7733 16.3864V17.3835H81.7193V15.1335H89.3557C89.3557 14.6108 89.242 14.1477 89.0148 13.7443C88.7875 13.3409 88.4722 13.0256 88.0687 12.7983C87.671 12.5653 87.208 12.4489 86.6795 12.4489C86.1284 12.4489 85.6398 12.5767 85.2136 12.8324C84.7932 13.0824 84.4636 13.4205 84.225 13.8466C83.9864 14.267 83.8642 14.7358 83.8585 15.2528V17.392C83.8585 18.0398 83.9778 18.5994 84.2165 19.071C84.4608 19.5426 84.8045 19.9062 85.2477 20.1619C85.6909 20.4176 86.2165 20.5455 86.8244 20.5455C87.2278 20.5455 87.5972 20.4886 87.9324 20.375C88.2676 20.2614 88.5545 20.0909 88.7932 19.8636C89.0318 19.6364 89.2136 19.358 89.3386 19.0284L92.6966 19.25C92.5261 20.0568 92.1767 20.7614 91.6483 21.3636C91.1256 21.9602 90.4494 22.4261 89.6199 22.7614C88.796 23.0909 87.8443 23.2557 86.7648 23.2557ZM99.2574 23.2557C97.9335 23.2557 96.7886 22.9744 95.8227 22.4119C94.8625 21.8437 94.121 21.054 93.5983 20.0426C93.0756 19.0256 92.8142 17.8466 92.8142 16.5057C92.8142 15.1534 93.0756 13.9716 93.5983 12.9602C94.121 11.9432 94.8625 11.1534 95.8227 10.5909C96.7886 10.0227 97.9335 9.73864 99.2574 9.73864C100.581 9.73864 101.723 10.0227 102.684 10.5909C103.649 11.1534 104.394 11.9432 104.916 12.9602C105.439 13.9716 105.701 15.1534 105.701 16.5057C105.701 17.8466 105.439 19.0256 104.916 20.0426C104.394 21.054 103.649 21.8437 102.684 22.4119C101.723 22.9744 100.581 23.2557 99.2574 23.2557ZM99.2744 20.4432C99.8767 20.4432 100.38 20.2727 100.783 19.9318C101.186 19.5852 101.49 19.1136 101.695 18.517C101.905 17.9205 102.01 17.2415 102.01 16.4801C102.01 15.7188 101.905 15.0398 101.695 14.4432C101.49 13.8466 101.186 13.375 100.783 13.0284C100.38 12.6818 99.8767 12.5085 99.2744 12.5085C98.6665 12.5085 98.1551 12.6818 97.7403 13.0284C97.3312 13.375 97.0216 13.8466 96.8114 14.4432C96.6068 15.0398 96.5045 15.7188 96.5045 16.4801C96.5045 17.2415 96.6068 17.9205 96.8114 18.517C97.0216 19.1136 97.3312 19.5852 97.7403 19.9318C98.1551 20.2727 98.6665 20.4432 99.2744 20.4432ZM106.261 9.90909H109.892V23.6477C109.892 24.6591 109.693 25.4773 109.295 26.1023C108.898 26.7273 108.327 27.1847 107.582 27.4744C106.844 27.7642 105.96 27.9091 104.932 27.9091C104.807 27.9091 104.688 27.9063 104.574 27.9006C104.455 27.9006 104.33 27.8977 104.199 27.892V25.054C104.295 25.0597 104.381 25.0625 104.455 25.0625C104.523 25.0682 104.597 25.071 104.676 25.071C105.261 25.071 105.67 24.946 105.903 24.696C106.142 24.4517 106.261 24.0824 106.261 23.5881V9.90909ZM108.068 8.22159C107.534 8.22159 107.074 8.04261 106.688 7.68466C106.301 7.32102 106.108 6.88636 106.108 6.38068C106.108 5.88068 106.301 5.4517 106.688 5.09375C107.074 4.73011 107.534 4.54829 108.068 4.54829C108.614 4.54829 109.077 4.73011 109.457 5.09375C109.844 5.4517 110.037 5.88068 110.037 6.38068C110.037 6.88636 109.844 7.32102 109.457 7.68466C109.077 8.04261 108.614 8.22159 108.068 8.22159ZM114.733 23.2472C113.898 23.2472 113.154 23.1023 112.5 22.8125C111.847 22.517 111.33 22.0824 110.949 21.5085C110.574 20.929 110.387 20.2074 110.387 19.3438C110.387 18.6165 110.52 18.0057 110.787 17.5114C111.054 17.017 111.418 16.6193 111.878 16.3182C112.338 16.017 112.861 15.7898 113.446 15.6364C114.037 15.483 114.657 15.375 115.304 15.3125C116.066 15.233 116.679 15.1591 117.145 15.0909C117.611 15.017 117.949 14.9091 118.16 14.767C118.37 14.625 118.475 14.4148 118.475 14.1364V14.0852C118.475 13.5455 118.304 13.1278 117.963 12.8324C117.628 12.5369 117.151 12.3892 116.532 12.3892C115.878 12.3892 115.358 12.5341 114.972 12.8239C114.586 13.108 114.33 13.4659 114.205 13.8977L110.847 13.625C111.017 12.8295 111.353 12.142 111.853 11.5625C112.353 10.9773 112.998 10.5284 113.787 10.2159C114.583 9.89773 115.503 9.73864 116.549 9.73864C117.276 9.73864 117.972 9.82386 118.637 9.99432C119.307 10.1648 119.901 10.429 120.418 10.7869C120.941 11.1449 121.353 11.6051 121.654 12.1676C121.955 12.7244 122.106 13.392 122.106 14.1705V23H118.662V21.1847H118.56C118.35 21.5938 118.069 21.9545 117.716 22.267C117.364 22.5739 116.941 22.8153 116.446 22.9915C115.952 23.1619 115.381 23.2472 114.733 23.2472ZM115.773 20.7415C116.307 20.7415 116.779 20.6364 117.188 20.4261C117.597 20.2102 117.918 19.9205 118.151 19.5568C118.384 19.1932 118.5 18.7812 118.5 18.321V16.9318C118.387 17.0057 118.231 17.0739 118.032 17.1364C117.838 17.1932 117.62 17.2472 117.375 17.2983C117.131 17.3437 116.887 17.3864 116.642 17.4261C116.398 17.4602 116.177 17.4915 115.978 17.5199C115.552 17.5824 115.179 17.6818 114.861 17.8182C114.543 17.9545 114.296 18.1392 114.12 18.3722C113.944 18.5994 113.856 18.8835 113.856 19.2244C113.856 19.7188 114.035 20.0966 114.392 20.358C114.756 20.6136 115.216 20.7415 115.773 20.7415ZM123.122 23V9.90909H126.642V12.1932H126.779C127.017 11.3807 127.418 10.767 127.98 10.3523C128.543 9.93182 129.19 9.72159 129.923 9.72159C130.105 9.72159 130.301 9.73295 130.512 9.75568C130.722 9.77841 130.906 9.80966 131.065 9.84943V13.071C130.895 13.0199 130.659 12.9744 130.358 12.9347C130.057 12.8949 129.781 12.875 129.531 12.875C128.997 12.875 128.52 12.9915 128.1 13.2244C127.685 13.4517 127.355 13.7699 127.111 14.179C126.872 14.5881 126.753 15.0597 126.753 15.5938V23H123.122ZM143.746 9.90909L139.169 23H135.078L130.501 9.90909H134.337L137.055 19.2756H137.192L139.902 9.90909H143.746ZM143.804 23V9.90909H147.434V23H143.804ZM145.627 8.22159C145.088 8.22159 144.625 8.04261 144.238 7.68466C143.858 7.32102 143.667 6.88636 143.667 6.38068C143.667 5.88068 143.858 5.4517 144.238 5.09375C144.625 4.73011 145.088 4.54829 145.627 4.54829C146.167 4.54829 146.627 4.73011 147.008 5.09375C147.394 5.4517 147.588 5.88068 147.588 6.38068C147.588 6.88636 147.394 7.32102 147.008 7.68466C146.627 8.04261 146.167 8.22159 145.627 8.22159ZM159.435 13.642L156.111 13.8466C156.054 13.5625 155.932 13.3068 155.744 13.0795C155.557 12.8466 155.31 12.6619 155.003 12.5256C154.702 12.3835 154.341 12.3125 153.92 12.3125C153.358 12.3125 152.884 12.4318 152.497 12.6705C152.111 12.9034 151.918 13.2159 151.918 13.608C151.918 13.9205 152.043 14.1847 152.293 14.4006C152.543 14.6165 152.972 14.7898 153.58 14.9205L155.949 15.3977C157.222 15.6591 158.17 16.0795 158.795 16.6591C159.42 17.2386 159.733 18 159.733 18.9432C159.733 19.8011 159.48 20.554 158.974 21.2017C158.474 21.8494 157.787 22.3551 156.912 22.7188C156.043 23.0767 155.04 23.2557 153.903 23.2557C152.17 23.2557 150.79 22.8949 149.761 22.1733C148.739 21.446 148.139 20.4574 147.963 19.2074L151.534 19.0199C151.642 19.5483 151.903 19.9517 152.318 20.2301C152.733 20.5028 153.264 20.6392 153.912 20.6392C154.548 20.6392 155.06 20.517 155.446 20.2727C155.838 20.0227 156.037 19.7017 156.043 19.3097C156.037 18.9801 155.898 18.7102 155.625 18.5C155.352 18.2841 154.932 18.1193 154.364 18.0057L152.097 17.554C150.818 17.2983 149.866 16.8551 149.241 16.2244C148.622 15.5937 148.312 14.7898 148.312 13.8125C148.312 12.9716 148.54 12.2472 148.994 11.6392C149.455 11.0312 150.099 10.5625 150.929 10.233C151.764 9.90341 152.741 9.73864 153.861 9.73864C155.514 9.73864 156.815 10.0881 157.764 10.7869C158.719 11.4858 159.276 12.4375 159.435 13.642ZM162.341 23.2216C161.779 23.2216 161.296 23.0227 160.892 22.625C160.495 22.2216 160.296 21.7386 160.296 21.1761C160.296 20.6193 160.495 20.142 160.892 19.7443C161.296 19.3466 161.779 19.1477 162.341 19.1477C162.887 19.1477 163.364 19.3466 163.773 19.7443C164.182 20.142 164.387 20.6193 164.387 21.1761C164.387 21.5511 164.29 21.8949 164.097 22.2074C163.91 22.5142 163.662 22.7614 163.356 22.9489C163.049 23.1307 162.711 23.2216 162.341 23.2216ZM169.301 23.2472C168.465 23.2472 167.721 23.1023 167.068 22.8125C166.414 22.517 165.897 22.0824 165.516 21.5085C165.141 20.929 164.954 20.2074 164.954 19.3438C164.954 18.6165 165.088 18.0057 165.355 17.5114C165.622 17.017 165.985 16.6193 166.445 16.3182C166.906 16.017 167.428 15.7898 168.014 15.6364C168.605 15.483 169.224 15.375 169.872 15.3125C170.633 15.233 171.247 15.1591 171.713 15.0909C172.178 15.017 172.516 14.9091 172.727 14.767C172.937 14.625 173.042 14.4148 173.042 14.1364V14.0852C173.042 13.5455 172.872 13.1278 172.531 12.8324C172.195 12.5369 171.718 12.3892 171.099 12.3892C170.445 12.3892 169.926 12.5341 169.539 12.8239C169.153 13.108 168.897 13.4659 168.772 13.8977L165.414 13.625C165.585 12.8295 165.92 12.142 166.42 11.5625C166.92 10.9773 167.565 10.5284 168.355 10.2159C169.15 9.89773 170.07 9.73864 171.116 9.73864C171.843 9.73864 172.539 9.82386 173.204 9.99432C173.874 10.1648 174.468 10.429 174.985 10.7869C175.508 11.1449 175.92 11.6051 176.221 12.1676C176.522 12.7244 176.673 13.392 176.673 14.1705V23H173.23V21.1847H173.127C172.917 21.5938 172.636 21.9545 172.284 22.267C171.931 22.5739 171.508 22.8153 171.014 22.9915C170.519 23.1619 169.948 23.2472 169.301 23.2472ZM170.34 20.7415C170.874 20.7415 171.346 20.6364 171.755 20.4261C172.164 20.2102 172.485 19.9205 172.718 19.5568C172.951 19.1932 173.068 18.7812 173.068 18.321V16.9318C172.954 17.0057 172.798 17.0739 172.599 17.1364C172.406 17.1932 172.187 17.2472 171.943 17.2983C171.698 17.3437 171.454 17.3864 171.21 17.4261C170.965 17.4602 170.744 17.4915 170.545 17.5199C170.119 17.5824 169.747 17.6818 169.428 17.8182C169.11 17.9545 168.863 18.1392 168.687 18.3722C168.511 18.5994 168.423 18.8835 168.423 19.2244C168.423 19.7188 168.602 20.0966 168.96 20.358C169.323 20.6136 169.784 20.7415 170.34 20.7415ZM177.689 23V9.90909H181.32V23H177.689ZM179.513 8.22159C178.974 8.22159 178.511 8.04261 178.124 7.68466C177.743 7.32102 177.553 6.88636 177.553 6.38068C177.553 5.88068 177.743 5.4517 178.124 5.09375C178.511 4.73011 178.974 4.54829 179.513 4.54829C180.053 4.54829 180.513 4.73011 180.894 5.09375C181.28 5.4517 181.474 5.88068 181.474 6.38068C181.474 6.88636 181.28 7.32102 180.894 7.68466C180.513 8.04261 180.053 8.22159 179.513 8.22159Z" fill="#464646"/>
</svg>

        </Link>
        <div className="mt-8 rounded article">
          <div  className="shadow-md border">
            <div className="border-b-[1px] bg-base-200 p-4 flex justify-between">
              <h3 className="text-base font-semibold pl-4">Summary</h3>
              <div className="flex">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="#E0E0E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 9.42847L12 5.42847L8 9.42847" stroke="#E0E0E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 6V15.4286" stroke="#E0E0E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              

              {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 8V16" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 12H16" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg> */}

              </div>
            </div>
            <p className=" pt-4 pb-4 pl-8 pr-8 font-medium text-base textColor leading-8">{video.summary}</p>
          </div>
     
          
       
          
          {!!answer && (
            // <div className="mt-8 border shadow-md p-8 rounded-md bg-base-200">
            //   <h3 className="text-xl font-bold">Answer</h3>
            //   <p className="mt-4">{answer}</p>
            // </div>
            <div className="mt-8 border shadow-md  rounded ">
              <div className="border-b-[1px] bg-base-200 p-4 flex justify-between">
                  <h3 className="text-base font-bold pl-4">Questions : {query}</h3>
                  <div className="flex">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer">
                    <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="#E0E0E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 9.42847L12 5.42847L8 9.42847" stroke="#E0E0E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 6V15.4286" stroke="#E0E0E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {!plusClicked && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer ml-4" onClick={handlePlusClick}>
                      <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 8V16" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M8 12H16" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    )}
                  </div>
              </div>
              <p className=" pt-4 pb-4 pl-8 pr-8  font-medium text-base textColor leading-8">{answer}</p>
            </div>

          )}
        </div>
        <div className="summaryForm ">
          <form
              className="mt-12 "
              onSubmit={(e) => {
                e.preventDefault();

                if (query) {
                  fetchAnswer(query);
                } else {
                  toast.error("Please provide a query!");
                }
              }}
            >
              <div className="form-control">
                <div className="input-group">
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Type in to chat with the video content.."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className={clsx("btn btn-square", isLoading && "loading")}
                    disabled={isLoading}
                  >
                    {!isLoading && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
          </form>

        </div>
        </div>
        <div className="w-3/5 videoSection2 p-10 ">
          <section className="mt-10">
            {/* <Image
              src={video.thumbnail}
              alt={video.title}
              height={120}
              width={120}
            /> */}

            <div>
              <h2 className="text-3xl font-bold videoText">{video.title}</h2>
              {/* <a href={video.url} className="mt-4 link">
                Watch Video
              </a> */}
            </div>
            <div className="video-notes">
              <iframe  className="youtubeIframe"
                src={videoUrl }>
              </iframe>
              <div className="mt-6 videoText">
                My Notes
              </div>
              {plusClicked && (
                    <div className="mt-8 border shadow-md  rounded ">
                    <div className="border-b-[1px] bg-base-200 p-4 flex justify-between">
                        <h3 className="text-base font-semibold pl-4">Questions : {query}</h3>
                        <div className="flex">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer">
                            <path d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12" stroke="#E0E0E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 9.42847L12 5.42847L8 9.42847" stroke="#E0E0E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 6V15.4286" stroke="#E0E0E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-4 mr-4">
                            <path d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" onClick={()=>setPlusClicked(false)}>
                            <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 12H16" stroke="#464646" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>


                        </div>
                    </div>
                    <p className=" pt-4 pb-4 pl-8 pr-8 font-medium text-base textColor leading-8">{answer}</p>
                  </div>
              )}
            </div>
            
          </section>
          
        </div>
      </section>
     
     
    </main>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const videoId = context.params?.videoId;

  const { data: video, error } = await supabaseClient
    .from("videos")
    .select("*")
    .eq("video_id", videoId)
    .single();

  if (error) throw error;

  return {
    props: {
      video,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
    revalidate: 60, // In seconds
  };
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export const getStaticPaths: GetStaticPaths = async () => {
  const { data: videos, error } = await supabaseClient
    .from("videos")
    .select("video_id");

  if (error) throw error;

  if (!videos) throw new Error("No videos found!");

  // Get the paths we want to pre-render based on videos
  const paths = videos.map((video) => ({
    params: { videoId: video.video_id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
};
