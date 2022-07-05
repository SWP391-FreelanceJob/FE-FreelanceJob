import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// const storage = useStorage();

/**
 *
 * @param {string} path
 * @param {Blob | File | Uint8Array | ArrayBuffer} image
 * @returns
 */
export const uploadImageToFirebase = async (storage, path, image) => {
  const imageRef = ref(storage, path);
  const uploadTask = await uploadBytes(imageRef, image);
  return uploadTask.ref;
};

/**
 *
 * @param {string} userId
 * @param {Blob | File | Uint8Array | ArrayBuffer} image
 * @returns
 */
export const uploadAvatarToFirebase = async (storage, userId, image) => {
  // const doctorAvatarRef = ref(storage, `UserImages/AvatarDoctor/${doctorId}`);
  // const uploadTask = await uploadBytes(doctorAvatarRef, image);
  // return uploadTask.ref;
  return await uploadImageToFirebase(
    storage,
    `UserImages/Avatar/${userId}`,
    image
  );
};

/**
 *
 * @param {string} userId
 * @param {Blob | File | Uint8Array | ArrayBuffer} image
 * @returns
 */
export const uploadAvatarToFirebaseGetDownloadUrl = async (
  storage,
  userId,
  image
) => {
  if (!image) return "";
  const ref = await uploadAvatarToFirebase(storage,userId, image);
  return await getDownloadURL(ref);
};

/**
 *
 * @param {string} clinicId
 * @param {Blob | File | Uint8Array | ArrayBuffer} image
 * @returns
 */
export const uploadClinicAvatarToFirebase = async (clinicId, image) => {
  // const doctorAvatarRef = ref(storage, `UserImages/AvatarDoctor/${doctorId}`);
  // const uploadTask = await uploadBytes(doctorAvatarRef, image);
  // return uploadTask.ref;
  return await uploadImageToFirebase(
    `UserImages/AvatarClinic/${clinicId}`,
    image
  );
};

/**
 *
 * @param {string} clinicId
 * @param {Blob | File | Uint8Array | ArrayBuffer} image
 * @returns
 */
export const uploadClinicAvatarToFirebaseGetDownloadUrl = async (
  clinicId,
  image
) => {
  if (!image) return "";
  const ref = await uploadClinicAvatarToFirebase(clinicId, image);
  return await getDownloadURL(ref);
};

/**
 *
 * @param {string} clinicId
 * @param {Blob | File | Uint8Array | ArrayBuffer} image
 * @returns
 */
export const uploadClinicCoverPhotoToFirebase = async (clinicId, image) => {
  // const doctorAvatarRef = ref(storage, `UserImages/AvatarDoctor/${doctorId}`);
  // const uploadTask = await uploadBytes(doctorAvatarRef, image);
  // return uploadTask.ref;
  return await uploadImageToFirebase(
    `UserImages/CoverPhotoClinic/${clinicId}`,
    image
  );
};

/**
 *
 * @param {string} clinicId
 * @param {string} imageName
 * @param {Blob | File | Uint8Array | ArrayBuffer} image
 * @returns
 */
export const uploadClinicCoverPhotoToFirebaseGetDownloadUrl = async (
  clinicId,
  imageName,
  image
) => {
  if (!image) return "";
  const ref = await uploadClinicCoverPhotoToFirebase(
    `${clinicId}-${imageName}`,
    image
  );
  return await getDownloadURL(ref);
};
