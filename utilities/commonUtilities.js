

export class commonUtilities {
  constructor(page) {
    this.page = page;

  }



  RandomNumberGenratorWithLength(length) {
    let randomNumber = Math.floor(
      Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
    );
    return randomNumber;
  }

  RandomStringGenratorWithLength(length) {
    let randomString = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < length; i++) {
      randomString += possible.charAt(
        Math.floor(Math.random() * possible.length)
      );
    }

    return randomString;
  }
  generateRandomPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }
    return password;
  }

}
