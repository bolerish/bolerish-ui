## Usage guidelines

### When to use

Use Alert `Dialog` when users must decide whether to proceed with a consequential action. For an edit form, use [Dialog](?path=/docs/components-dialog--docs). For a completed result, use Toast or inline feedback. Do not ask users to confirm every routine action.

### Explain the decision

Identify what will be deleted in `AlertDialogTitle`. Add only decision-relevant details, such as the scope of deletion or whether recovery is possible, in `AlertDialogDescription`. Use an action label such as “Delete project”, paired with Cancel. Do not use a vague “OK” to confirm data loss.

`AlertDialogAction` uses destructive `Button` styling in @bolerish/ui. It is not a general-purpose primary confirmation button. Both `AlertDialogAction` and `AlertDialogCancel` are close controls; neither implements persistence or request handling.

### Request and recovery

The dialog does not delete data. Wire the confirmation to application logic. For an asynchronous request, control the open state so a failure can remain visible with a retry action. Prevent repeated submission while the request is pending.

### Return to the task

> After success, remove the deleted item and move focus to a remaining item or the list heading if the original trigger no longer exists. If the list becomes empty, explain what the user can do next. After cancellation, return focus to the trigger.
