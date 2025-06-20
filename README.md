# import 

import CustomSelect from '@/components/CustomSelect.vue'

## node -v 

v18.189.0


## v-model 

Тип number, string, string[], number[], undefined, null

## Props

options - массив обьектов (Тип - массив обьектов, где ключ = string, значение - любое)

keys - массив строке (Тип string[]), первый элемент это значение из обьекта, которое будет передаваться в v-model, а второе это для отображения в UI

placeholder - плейсхолдер (Тип string)

isMulti - контрлирует тип селекта мульвыбор или одиночный (Тип boolean)

isDisabled - контролирует выключен ли селект (Тип boolean)

## Emits

change - срабатывает каждый раз, когда v-model меняется и передается наверх значение v-model

## Examples 

<pre> 
    ```
    <CustomSelect
    v-model="selected"
    :options="[{ id: '1', name: 'John' }, { id: '2', name: 'Vladimir' }]"
    :keys="['id', 'name']"
    placeholder="Выберите фрукт"
    />
    ``` 
</pre>

<pre> 
    ```
    <CustomSelect
    v-model="selected"
    :options="[{ id: 1, name: 'John' }, { id: 2, name: 'Vladimir' }]"
    :keys="['id', 'name']"
    placeholder="Выберите фрукт"
    isMulti
    />
    ``` 
</pre>