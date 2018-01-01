import 'firebase/firestore';


class FirestoreInsertion {
  uid: string;
  datetime: Date;
  title: string;
  description: string;
  category: string;
  price: string;
  image_url: string;

  constructor( ) {

    this.uid = '';
    this.title = '';
    this.description = '';
    this.category = '';
    this.price = '';
    this.image_url = '';
  }

  public getParams() {

    return {

      uid: this.uid,
      datetime: this.datetime,
      title: this.title,
      description: this.description,
      category: this.category,
      price: this.price,
      image_url: this.image_url,

    };

  }

  public setParams( uid: string, dt: Date, t: string, d: string, c: string, p: string, u: string) {

    this.uid = uid;
    this.datetime = dt;
    this.title = t;
    this.description = d;
    this.category = c;
    this.price = p;
    this.image_url = u;
  }
}

// Export original validator but rename it
export { FirestoreInsertion };
