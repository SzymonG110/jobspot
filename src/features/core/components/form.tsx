import {
  forwardRef,
  type HTMLInputTypeAttribute,
  type Ref,
  useImperativeHandle,
} from 'react';
import {
  useForm,
  Controller,
  type Control,
  type FieldValues,
} from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '#/features/core/components/ui/button';
import { Input } from '#/features/core/components/ui/input';
import { Label } from '#/features/core/components/ui/label';
import { Alert, AlertDescription } from '#/features/core/components/ui/alert';

const FormField = ({
  label,
  name,
  type = 'text',
  placeholder,
  control,
  errors,
}: {
  label: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  control: Control<FieldValues> | undefined;
  errors: Record<string, { message?: string } | undefined>;
}) => (
  <span className="space-y-2">
    <Label htmlFor={name}>{label}</Label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          id={name}
          type={type}
          placeholder={placeholder}
          className={errors[name]?.message ? 'border-red-500' : ''}
          onChange={(e) => {
            if (type === 'number') {
              field.onChange(Number(e.target.value));
            } else {
              field.onChange(e.target.value);
            }
          }}
        />
      )}
    />
    {errors[name]?.message && (
      <Alert variant="destructive">
        <AlertDescription>{errors[name]?.message}</AlertDescription>
      </Alert>
    )}
  </span>
);

export type FormRef = {
  submitForm: () => void;
  getValues: () => Record<string, string | number>;
};

const Form = forwardRef(
  (
    {
      schema,
      onSubmit,
      fields,
      isPending = false,
      submitText,
    }: {
      schema: z.ZodType;
      onSubmit?: (values: z.infer<typeof schema>) => void;
      fields: {
        name: string;
        label: string;
        value?: string | number;
        type?: HTMLInputTypeAttribute;
        placeholder?: string;
      }[];
      isPending?: boolean;
      submitText?: string;
    },
    ref: Ref<FormRef>,
  ) => {
    const {
      control,
      handleSubmit,
      formState: { errors },
      getValues,
    } = useForm({
      resolver: zodResolver(schema),
      defaultValues: fields.reduce(
        (acc, field) => {
          acc[field.name] = field.value ?? '';
          return acc;
        },
        {} as Record<string, string | number>,
      ),
      reValidateMode: 'onChange',
      mode: 'onChange',
    });

    useImperativeHandle(ref, () => ({
      submitForm: () => {
        if (onSubmit) {
          void handleSubmit(onSubmit)();
        }
      },
      getValues: () => getValues(),
    }));

    return (
      <form
        onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}
        className="space-y-2"
      >
        {fields.map((field) => (
          <FormField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            control={control}
            errors={errors as Record<string, { message?: string }>}
          />
        ))}

        {submitText ? (
          <Button
            type="button"
            className="w-full"
            disabled={isPending}
            onClick={() => {
              if (onSubmit) {
                void handleSubmit(onSubmit)();
              }
            }}
          >
            {isPending ? 'Pending...' : submitText}
          </Button>
        ) : null}
      </form>
    );
  },
);

Form.displayName = 'Form';

export { Form };
