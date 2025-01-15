import { ApiRoutes } from "./constants";
import { CartDTO, CreateCartItemValues } from "./dto/cart.dto";
import { axiosInstance } from "./instance";

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>(ApiRoutes.CART)).data;
};

export const updateItemQuantity = async (itemId: number, totalCount: number): Promise<CartDTO> => {
  return (await axiosInstance.patch<CartDTO>(ApiRoutes.CART_ID + itemId, { totalCount })).data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  return (await axiosInstance.delete<CartDTO>(ApiRoutes.CART_ID + id)).data;
};

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
  return (await axiosInstance.post<CartDTO>(ApiRoutes.CART, values)).data;
};
