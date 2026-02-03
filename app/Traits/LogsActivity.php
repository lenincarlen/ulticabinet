<?php

namespace App\Traits;

use App\Models\ActivityLog;

trait LogsActivity
{
    /**
     * Boot the trait.
     */
    protected static function bootLogsActivity()
    {
        // Log when a model is created
        static::created(function ($model) {
            if (method_exists($model, 'shouldLogActivity') && !$model->shouldLogActivity('created')) {
                return;
            }

            ActivityLog::log(
                'created',
                $model,
                static::getActivityDescription($model, 'created'),
                ['attributes' => $model->getAttributes()],
                static::getActivityMetadata($model, 'created')
            );
        });

        // Log when a model is updated
        static::updated(function ($model) {
            if (method_exists($model, 'shouldLogActivity') && !$model->shouldLogActivity('updated')) {
                return;
            }

            $changes = [];
            foreach ($model->getDirty() as $key => $value) {
                $changes[$key] = [
                    'old' => $model->getOriginal($key),
                    'new' => $value,
                ];
            }

            if (empty($changes)) {
                return;
            }

            ActivityLog::log(
                'updated',
                $model,
                static::getActivityDescription($model, 'updated'),
                $changes,
                static::getActivityMetadata($model, 'updated')
            );
        });

        // Log when a model is deleted
        static::deleted(function ($model) {
            if (method_exists($model, 'shouldLogActivity') && !$model->shouldLogActivity('deleted')) {
                return;
            }

            ActivityLog::log(
                'deleted',
                $model,
                static::getActivityDescription($model, 'deleted'),
                ['attributes' => $model->getAttributes()],
                static::getActivityMetadata($model, 'deleted')
            );
        });
    }

    /**
     * Get a human-readable description for the activity.
     */
    protected static function getActivityDescription($model, string $action): string
    {
        $modelName = class_basename($model);
        $identifier = $model->name ?? $model->id ?? 'Unknown';

        $descriptions = [
            'created' => "{$modelName} '{$identifier}' fue creado",
            'updated' => "{$modelName} '{$identifier}' fue actualizado",
            'deleted' => "{$modelName} '{$identifier}' fue eliminado",
        ];

        return $descriptions[$action] ?? "{$modelName} {$action}";
    }

    /**
     * Get metadata for the activity.
     */
    protected static function getActivityMetadata($model, string $action): array
    {
        return [];
    }

    /**
     * Determine if the activity should be logged.
     * Override this method in your model to customize logging behavior.
     */
    public function shouldLogActivity(string $action): bool
    {
        return true;
    }
}
