import useSWR from "swr";
import fetcher from "./fetcher";

export interface AllSensorList {
	message: string;
	data: Daum[];
	success: boolean;
}

export interface Daum {
	id: string;
	device_id: string;
	lng: number;
	lat: number;
	pmValue: number;
	createdAt: string;
	updatedAt: string;
}

export const useAllSensors = (token?: string) => {
	const api = import.meta.env.VITE_API_URL;
	const users = useSWR<AllSensorList>(api + "sensors", fetcher);
	return users;
};
