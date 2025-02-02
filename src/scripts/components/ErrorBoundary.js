export default class ErrorBoundary {
  static _toastConfig = {
    duration: 5000,
    className: "error-toast",
    iconText: "⚠️",
  };

  static _errorMessages = {
    "User Information Request": "Unable to load profile. Please try again.",
    "Initial Cards Request": "Unable to load images. Please refresh the page.",
    "Card Like Update": "Unable to update like status. Please try again.",
    "Card Delete": "Unable to delete card. Please try again.",
    "Profile Update": "Unable to save profile changes. Please try again.",
    default: "An error occurred. Please try again.",
  };

  static setStateManager(stateManager) {
    this._stateManager = stateManager;
  }

  static handleError(error, context) {
    console.error(`Error in ${context}:`, error);

    this._updateErrorState(error, context);
    this._showErrorToast(context);
  }

  static _updateErrorState(error, context) {
    this._stateManager.setState({
      errors: [
        ...this._stateManager.getState().errors,
        {
          context,
          message: this._getErrorMessage(context),
          timestamp: Date.now(),
        },
      ],
    });
  }

  static _createToastElement(message) {
    const toast = document.createElement("div");
    toast.className = this._toastConfig.className;

    const icon = document.createElement("span");
    icon.className = `${this._toastConfig.className}__icon`;
    icon.textContent = this._toastConfig.iconText;

    const messageElement = document.createElement("span");
    messageElement.className = `${this._toastConfig.className}__message`;
    messageElement.textContent = message;

    const closeBtn = document.createElement("button");
    closeBtn.className = `${this._toastConfig.className}__close`;
    closeBtn.textContent = "×";
    closeBtn.onclick = () => toast.remove();

    toast.append(icon, messageElement, closeBtn);
    return toast;
  }

  static _showErrorToast(context) {
    document.querySelector(`.${this._toastConfig.className}`)?.remove();

    const toast = this._createToastElement(this._getErrorMessage(context));
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), this._toastConfig.duration);
  }

  static _getErrorMessage(context) {
    return this._errorMessages[context] || this._errorMessages.default;
  }

  static async tryCatch(operation, context) {
    try {
      return await operation();
    } catch (error) {
      this.handleError(error, context);
      throw error;
    }
  }
}
