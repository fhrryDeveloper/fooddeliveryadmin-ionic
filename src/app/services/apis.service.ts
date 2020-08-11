
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
export class AuthInfo {
  constructor(public $uid: string) { }

  isLoggedIn() {
    return !!this.$uid;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  static UNKNOWN_USER = new AuthInfo(null);
  db = firebase.firestore();
  public authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(ApisService.UNKNOWN_USER);
  constructor(
    private fireAuth: AngularFireAuth,
    private adb: AngularFirestore,
    private http: HttpClient,
    private translateService: TranslateService
  ) { }

  public checkAuth() {
    return new Promise((resolve, reject) => {
      this.fireAuth.auth.onAuthStateChanged(user => {
        console.log(user);
        if (user) {
          localStorage.setItem('uid', user.uid);
          resolve(user);
        } else {
          this.logout();
          localStorage.clear();
          resolve(false);
        }
      });
    });
  }

  translate(str) {
    const currentLang = this.translateService.currentLang;
    const returnValue = this.translateService.translations[currentLang][str];
    if (returnValue === undefined) {
      return this.translateService.translations.en_merch[str];
    } else {
      return returnValue;
    }
  }

  public checkEmail(email: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.fetchSignInMethodsForEmail(email).then((info: any) => {
        resolve(info);
      }).catch(error => {
        reject(error);
      });
    });
  }


  public register(emails: string, pwd: string, fnames: string, lnames): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.createUserWithEmailAndPassword(emails, pwd)
        .then(res => {
          if (res.user) {
            this.db.collection('users').doc(res.user.uid).set({
              uid: res.user.uid,
              email: emails,
              fname: fnames,
              lname: lnames,
              type: 'venue',
              status: 'active'
            });
            this.authInfo$.next(new AuthInfo(res.user.uid));
            resolve(res.user);
          }
        })
        .catch(err => {

          this.authInfo$.next(ApisService.UNKNOWN_USER);
          reject(`login failed ${err}`);
        });
    });
  }



  public createAdminProfile(emails: string, pwd: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.createUserWithEmailAndPassword(emails, pwd)
        .then(res => {
          if (res.user) {
            this.db.collection('users').doc(res.user.uid).set({
              uid: res.user.uid,
              email: emails,
              type: 'admin',
            });
            this.authInfo$.next(new AuthInfo(res.user.uid));
            resolve(res.user);
          }
        })
        .catch(err => {

          this.authInfo$.next(ApisService.UNKNOWN_USER);
          reject(`login failed ${err}`);
        });
    });
  }



  public createVenue(informations: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('venue').doc(informations.uid).set(informations).then((data) => {
        resolve(data);
      }, error => {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }

  alerts(title, message, type) {
    Swal.fire(
      title,
      message,
      type
    );
  }

  public login(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          if (res.user) {
            this.authInfo$.next(new AuthInfo(res.user.uid));
            resolve(res.user);
          }
        })
        .catch(err => {

          this.authInfo$.next(ApisService.UNKNOWN_USER);
          reject(`login failed ${err}`);
        });
    });
  }

  public createDriver(
    email: string,
    password: string,
    fullname: string,
    coverImage: string,
    descriptions: string,
    phone: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          if (res.user) {
            this.db.collection('users').doc(res.user.uid).set({
              uid: res.user.uid,
              email: email,
              fullname: fullname,
              coverImage: coverImage,
              descriptions: descriptions,
              fcm_token: '',
              lat: '',
              lng: '',
              phone: phone,
              status: 'active',
              type: 'delivery',
              id: res.user.uid,
              current: 'active'
            });
            resolve(res.user);
          }
        })
        .catch(err => {

          this.authInfo$.next(ApisService.UNKNOWN_USER);
          reject(`login failed ${err}`);
        });
    });
  }

  public logout(): Promise<void> {
    this.authInfo$.next(ApisService.UNKNOWN_USER);
    // this.db.collection('users').doc(localStorage.getItem('uid')).update({ "fcm_token": firebase.firestore.FieldValue.delete() })
    return this.fireAuth.auth.signOut();
  }

  public getProfile(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('users').doc(id).get().subscribe((profile: any) => {
        resolve(profile.data());
      }, error => {
        reject(error);
      });
    });
  }

  public getRestReview(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('reviews', ref => ref.where('restId', '==', id)).get().subscribe(async (review) => {
        let data = review.docs.map((element) => {
          let item = element.data();
          item.id = element.id;
          if (item && item.uid) {
            item.uid.get().then(function (doc) {
              item.uid = doc.data();
            });
          }
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  public getAdmin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('users', ref => ref.where('type', '==', 'admin')).get().subscribe(async (review) => {
        let data = review.docs.map((element) => {
          let item = element.data();
          item.id = element.id;
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  getCurrencyCode() {
    return environment.general.code;
  }

  getCurrecySymbol() {
    return environment.general.symbol;
  }

  public getVenues(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('venue').get().subscribe((venue) => {
        let data = venue.docs.map(element => {
          let item = element.data();
          item.id = element.id;
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  public getUsers(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('users').get().subscribe((users) => {
        let data = users.docs.map(element => {
          let item = element.data();
          item.id = element.id;
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }


  public getAllOrders(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('orders').get().subscribe((orders) => {
        let data = orders.docs.map(element => {
          let item = element.data();
          item.id = element.id;
          item.vid.get().then(function (doc) {
            item.vid = doc.data();
            item.vid.id = doc.id;
          });
          item.uid.get().then(function (doc) {
            item.uid = doc.data();
            item.uid.id = doc.id;
          });
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  sendNotification(msg, title) {
    const body = {
      app_id: environment.onesignal.appId,
      included_segments: ['Active Users', 'Inactive Users"'],
      headings: { en: title },
      contents: { en: msg },
      data: { task: msg }
    };
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Basic ${environment.onesignal.restKey}`)
    };
    return this.http.post('https://onesignal.com/api/v1/notifications', body, header);
  }

  public getVenueDetails(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('venue').doc(id).get().subscribe((venue: any) => {
        resolve(venue.data());
      }, error => {
        reject(error);
      });
    });
  }
  public getMyProfile(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('users').doc(id).get().subscribe((users: any) => {
        resolve(users.data());
      }, error => {
        reject(error);
      });
    });
  }

  public getVenueUser(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('users').doc(id).get().subscribe((venue: any) => {
        resolve(venue.data());
      }, error => {
        reject(error);
      });
    });
  }

  public getVenueCategories(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('categories', ref => ref.where('uid', '==', id)).get().subscribe((venue) => {
        var data = venue.docs.map(element => {
          var item = element.data();
          item.id = element.id;
          return item;
        })
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  public getFoods(uid: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('foods').doc(uid).collection('all').get().then((data) => {
        var users = data.docs.map(doc => {
          var item = doc.data();
          item.cid.get().then(function (doc) {
            item.cid = doc.data();
            item.cid.id = doc.id;
          });
          item.id = doc.id;
          return item;
        });
        resolve(users);
      }, error => {
        reject(error);
      });
    });
  }

  public addNewAddress(uid, id, param): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('address').doc(uid).collection('all').doc(id).set(param).then((data) => {
        resolve(data);
      }, error => {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public addCoupon(id, param): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('offers').doc(id).set(param).then((data) => {
        resolve(data);
      }, error => {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }


  public addBanner(id, param): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('banners').doc(id).set(param).then((data) => {
        resolve(data);
      }, error => {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public addCity(id, param): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('cities').doc(id).set(param).then((data) => {
        resolve(data);
      }, error => {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public getCities(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('cities').get().subscribe((venue: any) => {
        let data = venue.docs.map(element => {
          let item = element.data();
          item.id = element.id;
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  public updateOffers(informations: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('offers').doc(informations.id).update(informations).then((data) => {
        resolve(data);
      }, error => {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public getOffers(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('offers').get().subscribe((venue: any) => {
        // resolve(venue.data());
        let data = venue.docs.map(element => {
          let item = element.data();
          item.id = element.id;
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  public getBanners(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('banners').get().subscribe((venue: any) => {
        // resolve(venue.data());
        let data = venue.docs.map(element => {
          let item = element.data();
          item.id = element.id;
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  public getMessages(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('messages').doc(id).collection('chats').get().subscribe((messages: any) => {
        console.log(messages);
        let data = messages.docs.map(element => {
          let item = element.data();
          item.id = element.id;
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  public getMyAddress(uid: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('address').doc(uid).collection('all').get().then((data) => {
        var users = data.docs.map(doc => {
          var item = doc.data();
          item.id = doc.id;
          return item;
        });
        resolve(users);
      }, error => {
        reject(error);
      });
    });
  }

  public createOrder(id, param): Promise<any> {
    param.vid = this.db.collection('venue').doc(param.vid);
    param.uid = this.db.collection('users').doc(param.uid);
    param.dId = this.db.collection('users').doc(param.dId);
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('orders').doc(id).set(param).then((data) => {
        resolve(data);
      }, error => {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }




  public getMyOrders(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('orders', ref => ref.where('userId', '==', id)).get().subscribe(async (venue) => {
        let data = venue.docs.map(element => {
          let item = element.data();
          item.vid.get().then(function (doc) {
            item.vid = doc.data();
            item.vid.id = doc.id;
          });
          item.id = element.id;
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  public getRestOrders(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('orders', ref => ref.where('restId', '==', id)).get().subscribe((venue) => {
        let data = venue.docs.map(element => {
          let item = element.data();
          item.uid.get().then(function (doc) {
            item.uid = doc.data();
            item.uid.id = doc.id;
          });
          item.id = element.id;
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  public getOrderById(id): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      this.adb.collection('orders').doc(id).get().subscribe(async (order: any) => {
        let data = await order.data();
        await data.vid.get().then(function (doc) {
          data.vid = doc.data();
          data.vid.id = doc.id;
        });
        await data.uid.get().then(function (doc) {
          data.uid = doc.data();
          data.uid.id = doc.id;
        });
        if (data && data.dId) {
          await data.dId.get().then(function (doc) {
            data.dId = doc.id;
            data.dId = doc.data();
          });
        }
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  getDriverInfo(id): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      this.adb.collection('users').doc(id).snapshotChanges().subscribe(data => {
        console.log(data);
        resolve(data.payload.data());
      }, error => {
        reject(error);
      });
    });
  }

  public getDrivers(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('users', ref => ref.where('type', '==', 'delivery')).get().subscribe(async (venue) => {
        let data = venue.docs.map(element => {
          let item = element.data();
          item.id = element.id;
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }


  public sendOrderToDriver(id, param): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('driverOrders').doc(id).set(param).then((data) => {
        resolve(data);
      }, error => {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public addReview(param): Promise<any> {
    param.vid = this.db.collection('venue').doc(param.vid);
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('reviews').doc(Math.random().toString()).set(param).then((data) => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public updateVenue(informations: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('venue').doc(informations.uid).update(informations).then((data) => {
        resolve(data);
      }, error => {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }


  public updateBanner(informations: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('banners').doc(informations.id).update(informations).then((data) => {
        resolve(data);
      }, error => {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public updateCity(informations: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('cities').doc(informations.id).update(informations).then((data) => {
        resolve(data);
      }, error => {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public deleteBanner(informations: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('banners').doc(informations.id).delete().then((data) => {
        resolve(data);
      }, error => {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public deleteCity(informations: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('cities').doc(informations.id).delete().then((data) => {
        resolve(data);
      }, error => {
        reject(error);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public updateProfile(uid, param): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('users').doc(uid).update(param).then((data) => {
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public getMyReviews(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.adb.collection('reviews', ref => ref.where('id', '==', id)).get().subscribe(async (review) => {
        let data = review.docs.map((element) => {
          let item = element.data();
          item.id = element.id;
          if (item && item.vid) {
            item.vid.get().then(function (doc) {
              item.vid = doc.data();
            });
          }

          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }


  JSON_to_URLEncoded(element, key?, list?) {
    let new_list = list || [];
    if (typeof element == "object") {
      for (let idx in element) {
        this.JSON_to_URLEncoded(
          element[idx],
          key ? key + "[" + idx + "]" : idx,
          new_list
        );
      }
    } else {
      new_list.push(key + "=" + encodeURIComponent(element));
    }
    return new_list.join("&");
  }


  httpPost(url, body) {
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', `Bearer ${environment.stripe.sk}`)
    };
    const order = this.JSON_to_URLEncoded(body);
    console.log(order);
    return this.http.post(url, order, header);
  }

  public updateOrderStatus(id, value): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      this.adb.collection('orders').doc(id).update({ status: value }).then(async (order: any) => {
        resolve(order);
      }).catch(error => {
        reject(error);
      });
    });
  }
}
