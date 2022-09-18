import Image from "next/image";
import styled, {keyframes} from "styled-components";
import SpotifyLogo from "/public/spotify-logo.svg";
import { LanyardData } from "../hooks/LanyardData";

export const Lanyard = (props: any) => {
    const activity = LanyardData();
    var anum = 0
    if (activity?.activities[0].type == 4) {
        anum = 1
    }
    return (
        <div>
            {activity?.activities[anum] ? (
                <div className="block lg:absolute lg:top-0 lg:right-0 text-white lg:pr-[10px] lg:pt-[10px] max-w-[350px]">
                    <div className="rounded-lg bg-[#303030]/50">
                        <div className="py-[15px] px-[25px]">
                            {activity?.activities[anum].type == 2 ? (
                                <div>
                                    <h1 className="font-firamono text-sm font-bold text-[#cccccc]">
                                        Listening to Spotify
                                        <LiveDot />
                                    </h1>
                                    <div className="flex items-center mt-2">
                                        {activity?.spotify?.album_art_url ? (
                                            <div className="relative h-[50px] mr-4">
                                                <div className="min-w-[50px] h-[50px] relative rounded-[8px] overflow-hidden">
                                                    <Image alt={`${activity?.activities[anum].name} Large Image`} src={activity.spotify!.album_art_url} layout="fill" />
                                                </div>
                                                <div className="absolute bottom-[-5px] right-[-5px] min-w-[20px] h-[20px] rounded-[50%] bg-black border-2 border-solid border-black/80 overflow-hidden">
                                                    <Image alt={`${activity?.activities[anum].name} Small Image`} src={SpotifyLogo} layout="fill" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="mr-4 min-w-[50px] h-[50px] relative rounded-[8px] overflow-hidden">
                                                <Image alt="Spotify Icon"  src={SpotifyLogo} layout="fill" />
                                            </div>
                                        )}
                                        <div className="grow">
                                            <h1 className="font-bold leading-none text-[16px]">{activity?.spotify?.song}</h1>
                                            <p className="leading-none mt-[6px] text-[14px]">by {activity?.spotify?.artist}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h1 className="font-firamono text-sm font-bold text-[#cccccc]">
                                        Doing something
                                    </h1>
                                    <div className="flex items-center mt-2 ">
                                        {activity?.activities[anum].assets ? (
                                        <div className="relative h-[50px] mr-4">
                                            <div className="min-w-[50px] h-[50px] relative rounded-[8px] overflow-hidden">
                                                <Image alt={`${activity?.activities[anum].name} Large Image`} src={`https://cdn.discordapp.com/app-assets/${activity.activities[anum].application_id}/${activity.activities[anum].assets!.large_image}.png`} layout="fill" />
                                            </div>
                                            {activity?.activities[anum].assets!.small_image ? (
                                                <div className="absolute bottom-[-5px] right-[-5px] min-w-[20px] h-[20px] rounded-[50%] bg-norm-gray/20 border-2 border-solid border-black/80 overflow-hidden">
                                                    <Image alt={`${activity?.activities[anum].name} Small Image`} src={`https://cdn.discordapp.com/app-assets/${activity.activities[anum].application_id}/${activity.activities[anum].assets!.small_image}.png`} layout="fill" />
                                                </div>
                                            ) : null}
                                        </div>
                                        ) : (
                                            <div className="mr-4 min-w-[50px] h-[50px] relative rounded-[8px] overflow-hidden">
                                                <Image alt="Filler Icon"  src={`https://cdn.discordapp.com/avatars/${activity.discord_user.id}/${activity.discord_user.avatar}.png`} layout="fill" />
                                            </div>
                                        )}
                                        <div className="grow">
                                            <h1 className="font-bold leading-none text-[16px]">{activity?.activities[anum].name}</h1>
                                            <p className="leading-none mt-[6px] text-[14px]">{activity?.activities[anum].details}</p>
                                            <p className="leading-none mt-[6px] text-[14px]">{activity?.activities[anum].state}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

const fadeInOut = keyframes`
  0% {
    opacity: 0;
  }
  
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0%;
  }
`;

const LiveDot = styled.div`
  display: inline-block;
  margin-left: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ff5252;
  animation: ${fadeInOut} 2s ease-in-out infinite;
`;

const ActivityImageContainer = styled.div`
  position: relative;
  height: 50px;
`;

const ActivityImage = styled(Image)`
  height: 50px;
  width: 50px;
  position: relative;
  border-radius: 10px;
`;

const ActivitySecondaryImage = styled(Image)`
  position: absolute;
  bottom: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #000;
  border: 2px solid #000;
`;