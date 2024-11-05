import { Repository } from "typeorm";
import { AppDataSouce } from "../db";
import { TitleEntity } from "../entities";
import { CreateTitleType } from "../types";

const titleRepository: Repository<TitleEntity> = AppDataSouce.getRepository(TitleEntity);


export const createTitle = async (
  data: CreateTitleType
): Promise<TitleEntity> => {
  // const titleRepository = AppDataSouce.getRepository(TitleEntity);
  const newTitle = titleRepository.create(data);
  await titleRepository.save(newTitle);

  return newTitle;
};

export const readTitle = async (uuid: string): Promise<TitleEntity[]> => {
  const titleRepository: Repository<TitleEntity> =
    AppDataSouce.getRepository(TitleEntity);

  return titleRepository.find({
    where: {
      userId: {
        uuid,
      },
    },
  });
};

export const deleteTitle = async (id: string): Promise<boolean> => {
  const result = await titleRepository.delete({ uuid: id });
  return result.affected > 0;
};

export const updateTitle = async (id: string, data: { title: string; details: string }): Promise<TitleEntity | null> => {
  const titleToUpdate = await titleRepository.findOne({ where: { uuid: id } });
  if (!titleToUpdate) return null;

  titleToUpdate.title = data.title;
  // titleToUpdate.details = data.details;

  await titleRepository.save(titleToUpdate);
  return titleToUpdate;
};
