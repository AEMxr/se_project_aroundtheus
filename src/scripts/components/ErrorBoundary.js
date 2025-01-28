export default class ErrorBoundary {
  static classes = {
    toast: "error-toast",
    icon: "error-toast__icon",
    message: "error-toast__message",
    close: "error-toast__close",
  };

  static errorMessages = {
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

  static _createToastElement(message) {
    const elements = {
      toast: document.createElement("div"),
      icon: document.createElement("span"),
      message: document.createElement("span"),
      close: document.createElement("button"),
    };

    elements.toast.className = this.classes.toast;
    elements.icon.className = this.classes.icon;
    elements.message.className = this.classes.message;
    elements.close.className = this.classes.close;

    elements.icon.textContent = "⚠️";
    elements.message.textContent = message;
    elements.close.textContent = "×";
    elements.close.onclick = () => elements.toast.remove();

    elements.toast.append(elements.icon, elements.message, elements.close);
    return elements.toast;
  }

  static handleError(error, context) {
    console.error(`Error in ${context}:`, error);

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

    document.querySelector(`.${this.classes.toast}`)?.remove();
    const toast = this._createToastElement(this._getErrorMessage(context));
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
  }

  static _getErrorMessage(context) {
    return this.errorMessages[context] || this.errorMessages.default;
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
