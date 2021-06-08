// 专门用来做多选的表单组件
import { defineComponent, ref, watch, PropType } from 'vue'
import {  SelectionWidgetPropsDefine, SelectionWidgetDefine  } from '../types'

const Selection:SelectionWidgetDefine =  defineComponent({
  name: 'SelectionWidget',
  props: SelectionWidgetPropsDefine,
  setup(props) {
    const currentValueRef = ref(props.value)

    watch(currentValueRef, (newv, oldv) => {
      if (newv !== props.value) {
        props.onChange(newv)
      }
    })

    watch(
      () => props.value,
      v => {
        if (v !== currentValueRef.value) {
          currentValueRef.value = v
        }
      },
    )

    return () => {
      const { options } = props
      return (
        <select multiple={true} v-model={currentValueRef.value}>
          {options.map(op => (
            <option value={op.value}>{op.key}</option>
          ))}
        </select>
      )
    }
  },
})

export default Selection