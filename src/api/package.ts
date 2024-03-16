import api from "./base";
import { PackageType, TourType } from "@src/types/base";

export interface PackageDataType {
    data: {
        tour_package: PackageType
        tour: TourType
    }
}

export const getPackageById = ({ id }: { id: number }): Promise<PackageDataType> => {
    return api
        .get(`/user/packages/${id}`)
        .then((res) => {
            return { data: res.data };
        })
        .catch((err) => {
            throw err;
        });
}
