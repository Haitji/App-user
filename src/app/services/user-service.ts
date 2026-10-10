import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    private users: User[] = []

    constructor(private http: HttpClient){

    }

    private url: string = 'http://localhost:8080/api/user';

    findAll(): Observable<User[]> {
        // return of(this.users);
        return this.http.get(this.url).pipe(
            map((data: any) => data as User[]),
        );
    }

    findByUser(id: number):Observable<User>{
        return this.http.get<User>(`${this.url}/${id}`);
    }

    createUser(user:User): Observable<User>{
        const {id, ...userWithoutId} = user;
        return this.http.post<User>(this.url, userWithoutId);
    }

    updateUser(user: User): Observable<User>{
        return this.http.put<User>(this.url+'/'+user.id, user);
    }

    removeUser(id: number): Observable<void>{
        return this.http.delete<void>(`${this.url}/${id}`);
    }
}
