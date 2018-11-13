<?php

use Illuminate\Http\Request;
// use App\Contact;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::post('/contacts', function (Request $request) {
//     if ($request['sub'] !== null) {
//         $results = DB::select('select * from contacts where user = :user', ['user' => $request['sub']]);
//         return response()->json($results);
//     }
// })->middleware('jwt');


// Route::post('/addContacts', function(Request $request) {

//     $path = $request->file('avatar')->store('images');

//     $contact = new Contact;
//     // $contact->user = $request['sub'];
//     // $contact->name = $request['name'];
//     // $contact->avatar = $path;
//     // $contact->phone = $request['phone'];
//     // $contact->favourite = $request['favourite'];
//     // $contact->save();
// // // Comprobar si se ha guardado y devolver el estado segun
//     // return response()->json([
//     //     // 'bla' => $request->file('avatar')->store('images'),
//     //     'code' => 201,
//     //     'status' => 'The contact is created successfully',
//     //     'contact' => $contact,
//     // ], 201);
//     return response()->json(['bla' => $request->file('avatar')]);
// })->middleware('jwt');

// Route::put('/contacts/{id}', function(Request $request, $id) {
//     $contact = Contact::find($id);
//     $contact->update($request->all());
//     return response()->json([
//         'code' => 204,
//         'status' => 'The contact is update successfully',
//         'contact' => DB::select('select * from contacts order by created_at desc')[0],
//     ], 201);
// });

// Route::delete('/contacts/{id}', function($id) {
//     Contact::find($id)->delete();
// })->middleware('jwt');

// Route::post('contacts', 'ContactController')->middleware('jwt');
// Route::post('/addContacts', 'ContactController')->name('contacts.addContacts')->middleware('jwt');
// Route::put('contacts/{id}', 'ContactController')->middleware('jwt');
// Route::delete('contacts/{id}', 'ContactController')->name()->middleware('jwt');
Route::resource('contacts', 'ContactController')->middleware('jwt');