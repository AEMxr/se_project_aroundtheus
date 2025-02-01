export default class ErrorBoundary {
  static setStateManager(stateManager) {
    this._stateManager = stateManager;
  }

  static handleError(error, context) {
    console.error(`Error in ${context}:`, error);

    this._stateManager.setState({
      errors: [
        ...this._stateManager.getState().errors,
        {
          context,
          message: this._getErrorMessage(error, context),
          timestamp: Date.now(),
        },
      ],
    });

    document.querySelector(".error-toast")?.remove();

    const toast = document.createElement("div");
    toast.className = "error-toast";

    const icon = document.createElement("span");
    icon.className = "error-toast__icon";
    icon.textContent = "⚠️";

    const message = document.createElement("span");
    message.className = "error-toast__message";
    message.textContent = this._getErrorMessage(error, context);

    const closeBtn = document.createElement("button");
    closeBtn.className = "error-toast__close";
    closeBtn.textContent = "×";
    closeBtn.onclick = () => toast.remove();

    toast.append(icon, message, closeBtn);
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 5000);
  }

  static _getErrorMessage(error, context) {
    const messages = {
      "User Information Request": "Unable to load profile. Please try again.",
      "Initial Cards Request":
        "Unable to load images. Please refresh the page.",
      "Card Like Update": "Unable to update like status. Please try again.",
      "Card Delete": "Unable to delete card. Please try again.",
      "Profile Update": "Unable to save profile changes. Please try again.",
      default: "An error occurred. Please try again.",
    };

    return messages[context] || messages.default;
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
