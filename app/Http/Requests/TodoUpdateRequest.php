<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TodoUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title'        => 'sometimes|required|string|max:255',
            'is_completed' => 'sometimes|required|boolean',
        ];
    }
}
