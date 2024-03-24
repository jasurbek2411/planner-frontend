import {
  ITimeBlockRespnose,
  TypeTimeBlockForm,
} from "./../types/time-block.types";
import { axiosWithAuth } from "@/api/interceptors";

class TimeBlockService {
  private BASE_URL = "user/time-blocks";

  async getTimeBlock() {
    const response = await axiosWithAuth.get<ITimeBlockRespnose[]>(this.BASE_URL);
    return response;
  }

  async createTimeBlock(data: TypeTimeBlockForm) {
    const response = await axiosWithAuth.post<ITimeBlockRespnose>(this.BASE_URL, data);
    return response;
  }

  async updateTimeBlock(id: string, data: TypeTimeBlockForm) {
    const response = await axiosWithAuth.put<ITimeBlockRespnose>(this.BASE_URL + `/${id}`, data);
    return response;
  }

  async deleteTimeBlock(id: string) {
    const response = await axiosWithAuth.delete(this.BASE_URL + `/${id}`);
    return response;
  }

  async updateOrderTimeBlock(ids: string[]) {
    const response = await axiosWithAuth.put(this.BASE_URL + "/update-order", { ids });
    return response;
  }
}

export const timeBlockService = new TimeBlockService();
