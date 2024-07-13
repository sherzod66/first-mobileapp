import { Env } from "../../env";

export const imageLink = (link: string): string => `${Env.StaticUrl}${link}`;
