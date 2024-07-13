import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { MAIN } from "../../../../navigation/ROUTES";
import { ApiService } from "../../../../services";
import { ROLES, Trainer } from "../../../../types";
import EventEmitter from "../../../../utils/EventEmitter";
import { FitnessClub } from "../../../../types/fitnessClub";

export const CreateTrainerHook = () => {
  const [trainer, setTrainer] = useState<Partial<FitnessClub>>({});
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onChange = (key: keyof FitnessClub) => (value: any) => {
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
          email: trainer.email ? trainer.email : " ",
          instagramLink: trainer.instagramLink ? trainer.instagramLink : " ",
          name: trainer.name,
          phoneNumber: trainer.phoneNumber,
          telegramLink: trainer.telegramLink ? trainer.telegramLink : " ",
          experience: trainer.experience ? trainer.experience : 0,
        };

        const res = await ApiService.post("/fitness-club", current);
        EventEmitter.notify("refreshTrainers");
        navigation.navigate(MAIN.FITNESS_CLUBS as never);
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
