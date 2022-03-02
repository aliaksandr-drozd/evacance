import React, { FC } from 'react'
import { FloatingPanel, Form, Slider } from 'antd-mobile'


export interface IPickRouteDeviationProps {
  onToleranceChange: (tolerance: number) => void
  tolerance: number
}

export const PickRouteDeviation: FC<IPickRouteDeviationProps> = ({
  onToleranceChange,
  tolerance,
}) => {
  return (
    <FloatingPanel
      anchors={ [100, 100] }
      handleDraggingOfContent={ false }
    >
      <Form>
        <Form.Header>Я готов отклониться от маршрута на { tolerance } км</Form.Header>

        <Slider
          min={ 10 }
          max={ 200 }
          defaultValue={ tolerance }
          // @ts-ignore
          onAfterChange={ onToleranceChange }
        />
      </Form>
    </FloatingPanel>
  )
}
