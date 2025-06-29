<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TodoStoreRequest extends FormRequest
{
    public function authorize()
    {
        return true;   // controller will check user
    }

    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
        ];
    }
}
