import axios from 'axios';
import { appInfo } from '../global/constants';

class User {
  populateFrom(token){
    this.token = token;
    return this.requestInfoFromServer();
  }

  isAdmin() {
    return this.info.roles.indexOf('admin') > -1;
  }

  updateUserIsAdminTo(user, isAdmin) {
    return new Promise((resolve, reject) => {
      const url = appInfo.serverAddressWithTokenFor('user/perms/update', this.token);
      const data = {
        'email_address': user.email_address,
        'isAdmin': isAdmin,
      }
      axios.post(url, data)
        .then(response => {
          resolve('Updated changes successfully at server');
        })
        .catch(err => {
          reject('I am sorry. I failed you.');
        });
    });
  }

  addComment(file, text) {
    return new Promise((resolve, reject) => {
      const url = appInfo.serverAddressWithTokenFor('comments/add/file=' + file._id, this.token);
      const data = {
        'text': text,
      };
      axios.post(url, data).then(res => {
        resolve(res);
      }).catch(err => {
        console.log('error');
        reject(err);
      });
    });
  }

  getCommentsFor(file) {
    return new Promise((resolve, reject) => {
      const url = appInfo.serverAddressWithTokenFor('comments/file=' + file._id, this.token);
      axios.get(url)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => reject(err));
    });
  }

  fetchFiles() {
    return new Promise((resolve, reject) => {
      const url = appInfo.serverAddressWithTokenFor('files/all', this.token);
      axios.get(url)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => reject(err));
    });
  }

  download(file) {
    const url = appInfo.serverAddressWithTokenFor('files/download/id=' + file._id, this.token);
    return new Promise((resolve) => {
      const link = document.createElement('a');
      link.download = file.filename;
      link.href = url;
      link.setAttribute('target', '_blank');
      link.click();
      resolve();
    });
  }

  uploadFiles(files, onProgress) {
    return new Promise((resolve, reject) => {
      const url = appInfo.serverAddressWithTokenFor('files/upload', this.token);
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append(
          'files',
          files[i],
        );
      }
      axios.post(url, data,{
        'onUploadProgress': (e) => onProgress(e)
      }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }

  updateTo(data) {
    return new Promise((resolve, reject) => {
      const url = appInfo.serverAddressWithTokenFor('user/update', this.token);
      axios.post(url, data)
        .then(response => {
          resolve('Updated changes successfully at server');
        })
        .catch(err => {
          reject('I am sorry. I failed you.');
        });
    });
  }

  createGroup(name, users, files) {
    return new Promise((resolve, reject) => {
      const url = appInfo.serverAddressWithTokenFor('groups/add', this.token);
      const data = {
        'name': name,
        'users': users,
        'files': files,
      };
      axios.post(url, data)
        .then(res => {
          resolve();
        })
        .catch(err => {
          reject();
        });
    });
  }

  fetchGroups() {
    const url = appInfo.serverAddressWithTokenFor('groups/all', this.token);
    return new Promise((resolve) => {
      axios.get(url)
        .then(response => {
          resolve(response.data);
        });
    });
  }

  fetchUsers() {
    const url = appInfo.serverAddressWithTokenFor('user/all', this.token);
    return new Promise((resolve) => {
      axios.get(url)
        .then(response => {
          resolve(response.data);
        });
    });
  }

  deleteFile(file) {
    const url = appInfo.serverAddressWithTokenFor('files/id=' + file._id, this.token);
    return new Promise((resolve) => {
      axios.delete(url)
        .then(() => {
          resolve();
        });
    });
  }

  deleteGroup(group) {
    const url = appInfo.serverAddressWithTokenFor('groups/id=' + group._id, this.token);
    return new Promise((resolve) => {
      axios.delete(url)
        .then(() => {
          resolve();
        });
    });
  }

  updateGroupTo(group, groupData) {
    return new Promise((resolve, reject) => {
      const url = appInfo.serverAddressWithTokenFor('groups/update', this.token);
      const data = {
        'groupID': group._id,
        'data': groupData,
      };
      axios.post(url, data)
        .then(response => {
          resolve('Updated group successfully at server.');
        })
        .catch(err => {
          reject('I am sorry. I failed you.');
        });
    });
  }

  requestInfoFromServer() {
    const self = this;
    const url = appInfo.serverAddressWithTokenFor('user/info', this.token);
    return new Promise((resolve) => {
      axios.get(url)
        .then(response => {
          self.info = response.data;
          resolve();
        });
    });
  }
}

const user = new User();
export default user;
