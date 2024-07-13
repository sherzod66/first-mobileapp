import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { MAIN } from "../../../../navigation/ROUTES";
import { ApiService } from "../../../../services";
import { ROLES, Trainer } from "../../../../types";
import EventEmitter from "../../../../utils/EventEmitter";

export const CreateTrainerHook = () => {
  const [trainer, setTrainer] = useState<Partial<Trainer>>({});
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onChange = (key: keyof Trainer) => (value: any) => {
    setTrainer({ ...trainer, [key]: value });
  };

  const onTrainerSubmit = async () => {
    console.log(trainer.name, trainer.phoneNumber);
    if (trainer.name && trainer.phoneNumber && trainer.email) {
      try {
        const current = {
          aboutMe: trainer.aboutMe ? trainer.aboutMe : " ",
          age: trainer.age ? trainer.age : 18,
          avatar: trainer.avatar ? trainer.avatar : " ",
          city: trainer.city ? trainer.city : " ",
          education: trainer.education ? trainer.education : " ",
          email: trainer.email ? trainer.email : " ",
          instagramLink: trainer.instagramLink ? trainer.instagramLink : " ",
          name: trainer.name,
          phoneNumber: trainer.phoneNumber,
          speciality: trainer.speciality ? trainer.speciality : " ",
          telegramLink: trainer.telegramLink ? trainer.telegramLink : " ",
          experience: trainer.experience ? trainer.experience : 0,
          gender: trainer?.trainerGenderType?.value
            ? trainer?.trainerGenderType?.value
            : "MALE",
        };

        const res = await ApiService.post("/trainers", current);
        EventEmitter.notify("refreshTrainers");
        navigation.navigate(MAIN.TRAINERS as never);
      } catch (error: any) {
        console.log(JSON.stringify(error.response?.data));
      }
    }
  };

  return {
    onChange,
    onTrainerSubmit,
    trainer,
  };
};
