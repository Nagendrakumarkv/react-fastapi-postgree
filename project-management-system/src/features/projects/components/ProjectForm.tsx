import { useForm, useFieldArray } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  projectSchema,
  type ProjectFormValues
} from '../schemas/project.schema';

import FormField from '../../../components/forms/FormField';

interface ProjectFormProps {
  onCreateProject: (
    project: ProjectFormValues
  ) => void | Promise<void>;
}

const managers = [
  { id: 'user-1', name: 'Nagendra' },
  { id: 'user-2', name: 'Rahul' },
  { id: 'user-3', name: 'Priya' }
];

function ProjectForm({ onCreateProject }: ProjectFormProps) {

  // 1. Initialize React Hook Form
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),

    defaultValues: {
      projectName: '',
      description: '',
      startDate: '',
      endDate: '',
      managerId: '',
      priority: 'Medium',
      milestones: []
    },

    mode: 'onBlur'
  });

  // 2. Dynamic milestone fields
  const {
    fields,
    append,
    remove
  } = useFieldArray({
    control,
    name: 'milestones'
  });

  // 3. Watch project dates
  const startDate = watch('startDate');
  const endDate = watch('endDate');

  // 4. Handle form submission
  async function handleCreateProject(data: ProjectFormValues) {
    await onCreateProject(data);
    reset();
  }

  return (
    <form
      className="project-form"
      onSubmit={handleSubmit(handleCreateProject)}
      noValidate
    >

      <div className="form-grid">

        {/* Project Name */}

        <FormField
          label="Project Name"
          htmlFor="projectName"
          error={errors.projectName?.message}
          required
        >
          <input
            id="projectName"
            type="text"
            placeholder="Enter project name"
            maxLength={80}
            {...register('projectName')}
            aria-invalid={!!errors.projectName}
          />
        </FormField>

        {/* Project Manager */}

        <FormField
          label="Project Manager"
          htmlFor="managerId"
          error={errors.managerId?.message}
          required
        >
          <select
            id="managerId"
            {...register('managerId')}
            aria-invalid={!!errors.managerId}
          >
            <option value="">Select project manager</option>

            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
              </option>
            ))}

          </select>
        </FormField>

        {/* Description */}

        <div className="form-full-width">

          <FormField
            label="Project Description"
            htmlFor="description"
            error={errors.description?.message}
            required
          >
            <textarea
              id="description"
              rows={4}
              maxLength={500}
              placeholder="Describe your project..."
              {...register('description')}
              aria-invalid={!!errors.description}
            />
          </FormField>

        </div>

        {/* Start Date */}

        <FormField
          label="Start Date"
          htmlFor="startDate"
          error={errors.startDate?.message}
          required
        >
          <input
            id="startDate"
            type="date"
            {...register('startDate')}
            max={endDate || undefined}
            aria-invalid={!!errors.startDate}
          />
        </FormField>

        {/* End Date */}

        <FormField
          label="End Date"
          htmlFor="endDate"
          error={errors.endDate?.message}
          required
        >
          <input
            id="endDate"
            type="date"
            {...register('endDate')}
            min={startDate || undefined}
            aria-invalid={!!errors.endDate}
          />
        </FormField>

        {/* Priority */}

        <FormField
          label="Priority"
          htmlFor="priority"
          required
        >
          <select
            id="priority"
            {...register('priority')}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </FormField>

      </div>

      {/* Dynamic Milestones */}

      <div className="milestone-section">

        <div className="milestone-heading">
          <div>
            <h3>Project Milestones</h3>
            <p>Add important project deadlines.</p>
          </div>

          <button
            type="button"
            className="secondary-button"
            disabled={fields.length >= 10}
            onClick={() =>
              append({
                title: '',
                dueDate: ''
              })
            }
          >
            + Add Milestone
          </button>
        </div>

        {fields.map((field, index) => (

          <div className="milestone-row" key={field.id}>

            <FormField
              label={`Milestone ${index + 1}`}
              htmlFor={`milestone-title-${field.id}`}
              error={errors.milestones?.[index]?.title?.message}
            >
              <input
                id={`milestone-title-${field.id}`}
                placeholder="Milestone title"
                {...register(`milestones.${index}.title`)}
                aria-invalid={!!errors.milestones?.[index]?.title}
              />
            </FormField>

            <FormField
              label="Due Date"
              htmlFor={`milestone-date-${field.id}`}
              error={errors.milestones?.[index]?.dueDate?.message}
            >
              <input
                id={`milestone-date-${field.id}`}
                type="date"
                min={startDate || undefined}
                max={endDate || undefined}
                {...register(`milestones.${index}.dueDate`)}
                aria-invalid={!!errors.milestones?.[index]?.dueDate}
              />
            </FormField>

            <button
              type="button"
              className="remove-button"
              onClick={() => remove(index)}
              aria-label={`Remove milestone ${index + 1}`}
            >
              Remove
            </button>

          </div>

        ))}

        {errors.milestones?.root?.message && (
          <p className="field-error">
            {errors.milestones.root.message}
          </p>
        )}

      </div>

      {/* Form Actions */}

      <div className="form-actions">

        <button
          type="button"
          className="secondary-button"
          onClick={() => reset()}
        >
          Reset
        </button>

        <button
          type="submit"
          className="primary-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create Project'}
        </button>

      </div>

    </form>
  );
}

export default ProjectForm;