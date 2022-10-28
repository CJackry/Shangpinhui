import {v4 as uuidv4} from 'uuid';
//随机生成一串字符串，当执行过后就变为常量不再改变，游客持久化存储
export const getUUID = () => {
  let uuid_token = localStorage.getItem('UUIDTOKEN');
  if(!uuid_token){
      uuid_token = uuidv4();
      localStorage.setItem('UUIDTOKEN', uuid_token);
  }
  return uuid_token;
}