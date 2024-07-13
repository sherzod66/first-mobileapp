import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ApiService } from "../../../../services";
import { Response, User } from "../../../../types";

export const useStudentInfo = () => {
  const [active, setActive] = useState(0);
  const [userName, setUserName] = useState<string>("");
  const route = useRoute();
  const apprenticeId = route?.params?.apprenticeId;
  const getUser = async () => {
    try {
      const req = await ApiService.get<Response<User>>(
        `/users/${apprenticeId}`
      );
      setUserName(req.data.name);
    } catch (e) {}
  };
  useEffect(() => {
    if (apprenticeId && apprenticeId.length > 1) getUser();
  }, []);

  return { active, setActive, apprenticeId, userName };
};
