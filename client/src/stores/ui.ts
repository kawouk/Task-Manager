import { observable, action, makeAutoObservable, computed } from "mobx";

class UIStore {
  @observable openModal: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
  @computed get modalOpen() {
    return this.openModal;
  }
  @action openTaskModal = () :void=> {
    this.openModal = true;
  };
  @action closeModal = () => {
    this.openModal = false;
  };
}
const uIStore = new UIStore();

export default uIStore;
