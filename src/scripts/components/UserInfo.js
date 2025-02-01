import ConfigManager from "./ConfigManager.js";

export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector, stateManager }) {
    const profileSelectors = ConfigManager.config.selectors.profile;

    this._elements = {
      name: document.querySelector(nameSelector || profileSelectors.name),
      job: document.querySelector(jobSelector || profileSelectors.job),
      avatar: document.querySelector(avatarSelector || profileSelectors.avatar),
    };
    this._stateManager = stateManager;
  }

  getUserInfo() {
    return {
      name: this._elements.name.textContent,
      job: this._elements.job.textContent,
      avatar: this._elements.avatar.src,
    };
  }

  setUserInfo({ name, job, avatar }) {
    if (name) this._nameElement.textContent = name;
    if (job) this._jobElement.textContent = job;
    if (avatar) this._avatarElement.src = avatar;
  }
}
