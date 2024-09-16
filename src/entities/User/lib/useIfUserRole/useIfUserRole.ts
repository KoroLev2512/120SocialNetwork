// TODO: Refactor this file to use store

// import { ROLES } from "@/entities/User/types/userState";
// import { isEmpty, isNull } from "lodash";
// import { useUserStore } from "@/entities/User/model/slice/userStore";

// export const useIfUserRole = () => {
//   const user = useUserStore((state) => state.user);
//   if (isNull(user) || isEmpty(user.roles)) {
//     return {
//       isUser: false,
//       isAdmin: false,
//     };
//   }
//
//   return {
//     isUser: user.roles.some((item) => item.value === ROLES.USER) || false,
//     isAdmin: user.roles.some((item) => item.value === ROLES.ADMIN) || false,
//   };
// };
