<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadBannerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        if($this->input('upload') == 1){
            return [
                'title' => 'required',
                'banner' => 'required|sometimes|mimes:jpeg,png|dimensions:min_width=1200,min_height=508|max:10240',
                'status' => 'required|sometimes'
            ];
        }else{
            return [
                'title' => 'required',
                'banner' => 'required|mimes:jpeg,png|dimensions:min_width=1200,min_height=508|max:10240',
                'status' => 'required|sometimes'
            ];
        }
    }
}
