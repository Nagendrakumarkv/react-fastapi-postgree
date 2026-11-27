import { z } from 'zod';

const milestoneSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Milestone title must be at least 3 characters'),

  dueDate: z
    .string()
    .min(1, 'Milestone due date is required')
});

export const projectSchema = z.object({

  projectName: z
    .string()
    .trim()
    .min(3, 'Project name must contain at least 3 characters')
    .max(80, 'Project name cannot exceed 80 characters'),

  description: z
    .string()
    .trim()
    .min(10, 'Description must contain at least 10 characters')
    .max(500, 'Description cannot exceed 500 characters'),

  startDate: z
    .string()
    .min(1, 'Start date is required'),

  endDate: z
    .string()
    .min(1, 'End date is required'),

  managerId: z
    .string()
    .min(1, 'Please select a project manager'),

  priority: z.enum(['Low', 'Medium', 'High']),

  milestones: z
    .array(milestoneSchema)
    .max(10, 'Maximum 10 milestones are allowed')

}).superRefine((data, context) => {

  // Cross-field validation: end date must not be before start date
  if (
    data.startDate &&
    data.endDate &&
    data.endDate < data.startDate
  ) {
    context.addIssue({
      code: 'custom',
      path: ['endDate'],
      message: 'End date must be after or equal to start date'
    });
  }

  // Cross-field validation: milestone dates must be inside project dates
  data.milestones.forEach((milestone, index) => {

    if (
      milestone.dueDate &&
      data.startDate &&
      milestone.dueDate < data.startDate
    ) {
      context.addIssue({
        code: 'custom',
        path: ['milestones', index, 'dueDate'],
        message: 'Milestone cannot be before project start date'
      });
    }

    if (
      milestone.dueDate &&
      data.endDate &&
      milestone.dueDate > data.endDate
    ) {
      context.addIssue({
        code: 'custom',
        path: ['milestones', index, 'dueDate'],
        message: 'Milestone cannot be after project end date'
      });
    }

  });

});

export type ProjectFormValues = z.infer<typeof projectSchema>;